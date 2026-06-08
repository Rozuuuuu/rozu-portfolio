import { useState, useEffect, useRef } from 'react';

// Haversine formula to calculate distance in meters between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the earth in meters
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

/**
 * useProximityEtiquette — Custom hook that tracks user geolocation
 * and monitors proximity to the active route's stops.
 * 
 * @param {Array} stops - Array of { stop_id, stop_name, lat, lng }
 * @param {Function} onProximityTrigger - Callback when user is < 200m from a stop
 * @param {number} thresholdMeters - Distance threshold in meters (default: 200)
 */
export function useProximityEtiquette(stops = [], onProximityTrigger, thresholdMeters = 200) {
  const [nearestStop, setNearestStop] = useState(null);
  const [distance, setDistance] = useState(Infinity);
  const [isNearStop, setIsNearStop] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  
  const lastTriggeredStopIdRef = useRef(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported by this browser.');
      return;
    }

    const handleSuccess = (position) => {
      const { latitude: uLat, longitude: uLng } = position.coords;
      setUserLocation({ lat: uLat, lng: uLng });
      setError(null);

      if (!stops || stops.length === 0) {
        setNearestStop(null);
        setDistance(Infinity);
        setIsNearStop(false);
        return;
      }

      let minDistance = Infinity;
      let closestStop = null;

      stops.forEach((stop) => {
        const d = calculateDistance(uLat, uLng, stop.lat, stop.lng);
        if (d < minDistance) {
          minDistance = d;
          closestStop = stop;
        }
      });

      setNearestStop(closestStop);
      setDistance(minDistance);
      
      const isNear = minDistance <= thresholdMeters;
      setIsNearStop(isNear);

      if (isNear && closestStop) {
        // Only trigger if we haven't triggered for this stop in this session
        if (lastTriggeredStopIdRef.current !== closestStop.stop_id) {
          lastTriggeredStopIdRef.current = closestStop.stop_id;
          if (onProximityTrigger) {
            onProximityTrigger(closestStop, minDistance);
          }
        }
      } else if (!isNear) {
        // Reset triggered stop id when we move away from any threshold
        lastTriggeredStopIdRef.current = null;
      }
    };

    const handleError = (err) => {
      console.warn('Geolocation error:', err.message);
      setError(err.message);
    };

    // Watch position with high accuracy
    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [stops, onProximityTrigger, thresholdMeters]);

  return { nearestStop, distance, isNearStop, userLocation, error };
}
