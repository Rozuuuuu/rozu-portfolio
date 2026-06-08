import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const CARTO_DARK = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const CARTO_LIGHT = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

export default function MapView({ selectedRouteId, userLocation, dark }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const selectedRouteIdRef = useRef(selectedRouteId);

  // Keep ref up-to-date to prevent stale closures in async handlers
  useEffect(() => {
    selectedRouteIdRef.current = selectedRouteId;
  }, [selectedRouteId]);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialStyle = dark ? CARTO_DARK : CARTO_LIGHT;
    
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialStyle,
      center: [123.8854, 10.3157], // Cebu City [lng, lat]
      zoom: 12.5,
      pitch: 0,
      antialias: true
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false
    }), 'top-right');

    mapRef.current = map;

    map.on('load', () => {
      // Trigger drawing of initial selected route if exists
      if (selectedRouteIdRef.current) {
        drawRoute(selectedRouteIdRef.current);
      }
    });

    return () => {
      map.remove();
    };
  }, []); // Only initialize once on mount

  // 2. Respond to Dark Mode Changes Dynamically
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const targetStyle = dark ? CARTO_DARK : CARTO_LIGHT;
    
    // Save route redraw trigger after style loads
    const handleStyleData = () => {
      if (selectedRouteIdRef.current) {
        drawRoute(selectedRouteIdRef.current);
      }
      map.off('styledata', handleStyleData);
    };

    map.on('styledata', handleStyleData);
    map.setStyle(targetStyle);

  }, [dark]);

  // 3. User Location Marker Updates
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (userLocation) {
      const { lat, lng } = userLocation;
      
      if (userMarkerRef.current) {
        userMarkerRef.current.setLngLat([lng, lat]);
      } else {
        const el = document.createElement('div');
        el.className = 'custom-user-marker';
        el.title = 'My Current Location';

        userMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([lng, lat])
          .addTo(map);
      }
    } else {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
    }
  }, [userLocation]);

  // 4. Redraw Route when route changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    
    if (selectedRouteId) {
      drawRoute(selectedRouteId);
    } else {
      clearLayers();
    }
  }, [selectedRouteId]);

  // Core drawing logic
  const clearLayers = () => {
    const map = mapRef.current;
    if (!map) return;

    // Clean layers
    ['route-line-glow', 'route-line', 'stops-points', 'stops-labels'].forEach((layerId) => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
    });

    // Clean sources
    ['route-source', 'stops-source'].forEach((sourceId) => {
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    });
  };

  const drawRoute = async (routeId) => {
    const map = mapRef.current;
    if (!map) return;

    clearLayers();

    // Parallel fetch using Promise.allSettled for maximum resilience
    const [shapeResult, stopsResult] = await Promise.allSettled([
      fetch(`/api/route-shape?route_id=${routeId}`).then((r) => {
        if (!r.ok) throw new Error(`HTTP shape error ${r.status}`);
        return r.json();
      }),
      fetch(`/api/route-stops?route_id=${routeId}`).then((r) => {
        if (!r.ok) throw new Error(`HTTP stops error ${r.status}`);
        return r.json();
      })
    ]);

    // Parse results
    const hasStops = stopsResult.status === 'fulfilled';
    const stopsData = hasStops ? stopsResult.value : [];
    
    let geojsonData = null;
    let fallbackUsed = false;

    if (shapeResult.status === 'fulfilled') {
      geojsonData = shapeResult.value;
    } else {
      // Shape failed: Graceful Fallback to straight-line interpolation between sequenced stops
      console.warn(`Shape retrieval failed for ${routeId}. Falling back to stop interpolation.`, shapeResult.reason);
      fallbackUsed = true;
      if (hasStops && stopsData.length > 0) {
        const coordinates = stopsData.map((s) => [s.lng, s.lat]);
        geojsonData = {
          type: 'Feature',
          properties: { fallback: true },
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        };
      }
    }

    if (!geojsonData && stopsData.length === 0) {
      console.error('Unable to render route shape or stops due to network failures.');
      return;
    }

    // A. Draw Route Line Source & Layer (if coordinates available)
    if (geojsonData && geojsonData.geometry && geojsonData.geometry.coordinates.length > 0) {
      map.addSource('route-source', {
        type: 'geojson',
        data: geojsonData
      });

      // 1. Draw Glow Layer underneath
      map.addLayer({
        id: 'route-line-glow',
        type: 'line',
        source: 'route-source',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': fallbackUsed ? '#E11D48' : '#0066CC', // Red for fallback, Cebu Blue for regular
          'line-width': 8,
          'line-opacity': 0.35,
          'line-blur': 4
        }
      });

      // 2. Draw Sharp Top Line
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route-source',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': fallbackUsed ? '#F43F5E' : '#0088FF',
          'line-width': 4
        }
      });

      // Fit bounds to route coordinates
      try {
        const coords = geojsonData.geometry.coordinates;
        const bounds = coords.reduce((acc, coord) => {
          return acc.extend(coord);
        }, new maplibregl.LngLatBounds(coords[0], coords[0]));

        map.fitBounds(bounds, {
          padding: 60,
          maxZoom: 15,
          duration: 1200
        });
      } catch (err) {
        console.warn('Fitting map bounds failed:', err);
      }
    }

    // B. Draw Stops Circle Source & Layer
    if (hasStops && stopsData.length > 0) {
      const stopsGeoJSON = {
        type: 'FeatureCollection',
        features: stopsData.map((stop) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [stop.lng, stop.lat]
          },
          properties: {
            stop_id: stop.stop_id,
            stop_name: stop.stop_name,
            stop_sequence: stop.stop_sequence
          }
        }))
      };

      map.addSource('stops-source', {
        type: 'geojson',
        data: stopsGeoJSON
      });

      // 1. Draw circle indicators
      map.addLayer({
        id: 'stops-points',
        type: 'circle',
        source: 'stops-source',
        paint: {
          'circle-radius': 6,
          'circle-color': '#FFFFFF',
          'circle-stroke-width': 3.5,
          'circle-stroke-color': '#0066CC',
          'circle-pitch-alignment': 'map'
        }
      });

      // 2. Draw labels for key stops (e.g. sequence 1, last sequence, or on hover)
      map.addLayer({
        id: 'stops-labels',
        type: 'symbol',
        source: 'stops-source',
        layout: {
          'text-field': ['get', 'stop_name'],
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'text-size': 10,
          'text-offset': [0, 1.3],
          'text-anchor': 'top',
          'text-max-width': 8
        },
        paint: {
          'text-color': dark ? '#FFFFFF' : '#000000',
          'text-halo-color': dark ? '#000000' : '#FFFFFF',
          'text-halo-width': 2
        }
      });
      
      // Interactive popups on stop clicks
      map.on('click', 'stops-points', (e) => {
        const feature = e.features[0];
        const coordinates = feature.geometry.coordinates.slice();
        const { stop_name, stop_sequence } = feature.properties;

        new maplibregl.Popup({ offset: 10 })
          .setLngLat(coordinates)
          .setHTML(`<div style="font-family: 'JetBrains Mono', monospace; padding: 2px;">
            <p style="font-weight: bold; margin: 0 0 2px 0; font-size: 12px; color: #000;">${stop_name}</p>
            <p style="margin: 0; font-size: 10px; color: #666;">Stop #${stop_sequence}</p>
          </div>`)
          .addTo(map);
      });

      // Cursor pointer effects
      map.on('mouseenter', 'stops-points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'stops-points', () => {
        map.getCanvas().style.cursor = '';
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
