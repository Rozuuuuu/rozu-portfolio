import { useState, startTransition } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import SEO from '../components/SEO';
import MapView from '../components/sugboway/MapView';
import RoutePanel from '../components/sugboway/RoutePanel';
import LugarToast from '../components/sugboway/LugarToast';
import { useProximityEtiquette } from '../hooks/useProximityEtiquette';
import { routes } from '../data/sugboway/routeData';
import '../components/sugboway/sugboway.css';

export default function SugboWayPage() {
  const { dark } = useDarkMode();
  const [selectedRouteId, setSelectedRouteId] = useState('route_13c');
  const [toastOpen, setToastOpen] = useState(false);
  const [activeStop, setActiveStop] = useState(null);
  const [activeDistance, setActiveDistance] = useState(Infinity);

  const activeRoute = routes.find((r) => r.route_id === selectedRouteId);

  // Hook to track user real location and check proximity
  const { nearestStop, distance, isNearStop, userLocation, error: locationError } = useProximityEtiquette(
    activeRoute?.stops || [],
    (stop, dist) => {
      setActiveStop(stop);
      setActiveDistance(dist);
      setToastOpen(true);
    },
    200 // 200 meters proximity trigger
  );

  const handleSelectRoute = (routeId) => {
    startTransition(() => {
      setSelectedRouteId(routeId);
    });
  };

  // Helper to simulate approaching a stop for demo/portfolio purposes
  const simulateApproach = () => {
    if (!activeRoute || activeRoute.stops.length === 0) return;
    // Choose a random stop or the middle stop of the active route
    const midIdx = Math.floor(activeRoute.stops.length / 2);
    const mockStop = activeRoute.stops[midIdx];
    
    setActiveStop(mockStop);
    setActiveDistance(120); // 120m
    setToastOpen(true);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row pt-14 bg-white dark:bg-black text-black dark:text-white sugboway-container overflow-hidden">
      <SEO
        title="SugboWay | Cebu Jeepney Tracking & Route Planner"
        description="Interactive Cebu Jeepney route planner and stop tracking. Ingesting routes 01B, 03B, 13C with custom proximity alerts."
        path="/sugboway"
      />

      {/* Sidebar - Control Panel */}
      <div className="w-full md:w-[400px] h-[350px] md:h-full flex flex-col border-b md:border-b-0 md:border-r border-neutral-200/50 dark:border-neutral-800 bg-white/70 dark:bg-black/70 backdrop-blur-md z-10">
        <RoutePanel
          selectedRouteId={selectedRouteId}
          onSelectRoute={handleSelectRoute}
          userLocation={userLocation}
          userLocationError={locationError}
        />
        
        {/* Simulation Controls in Sidebar Footer */}
        <div className="p-5 border-t border-neutral-200/50 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/10 flex flex-col gap-2">
          <h4 className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Portfolio Simulator
          </h4>
          <button
            onClick={simulateApproach}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-neutral-200 hover:border-black dark:border-neutral-800 dark:hover:border-white font-mono text-xs font-semibold bg-white dark:bg-black hover:bg-neutral-50 dark:hover:bg-neutral-905 transition-all duration-200"
          >
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Simulate Stop Approach
          </button>
        </div>
      </div>

      {/* Map View Canvas */}
      <div className="flex-1 h-[calc(100vh-350px-3.5rem)] md:h-full relative bg-neutral-100 dark:bg-neutral-900">
        <MapView
          selectedRouteId={selectedRouteId}
          userLocation={userLocation}
          dark={dark}
        />

        {/* Floating banner warning/info */}
        <div className="absolute top-4 left-4 z-10 max-w-[calc(100%-2rem)] bg-white/90 dark:bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-neutral-200/50 dark:border-neutral-800 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse flex-shrink-0" />
          <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-300">
            Active: Route {activeRoute?.route_code || 'None'}
          </span>
        </div>
      </div>

      {/* Proximity Etiquette Toast */}
      <LugarToast
        isOpen={toastOpen}
        stopName={activeStop?.stop_name || ''}
        distance={activeDistance}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
