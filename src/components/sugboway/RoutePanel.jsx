import { m } from 'framer-motion';
import { routes } from '../../data/sugboway/routeData';

export default function RoutePanel({ selectedRouteId, onSelectRoute, userLocationError, userLocation }) {
  const selectedRoute = routes.find((r) => r.route_id === selectedRouteId);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-5 border-b border-neutral-200/50 dark:border-neutral-800">
        <h2 className="font-headline font-black text-2xl tracking-tighter text-black dark:text-white uppercase">
          SugboWay
        </h2>
        <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Jeepney Route Planner & Tracking
        </p>
      </div>

      {/* Geolocation Status */}
      <div className="px-5 py-2 border-b border-neutral-200/50 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <div className="flex items-center gap-2 text-xs">
          <span className={`h-2 w-2 rounded-full ${userLocation ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`}></span>
          <span className="font-mono text-[10px] text-neutral-600 dark:text-neutral-400">
            {userLocation 
              ? `GPS Connected (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})` 
              : userLocationError 
                ? `GPS Error: ${userLocationError}` 
                : 'Connecting GPS...'}
          </span>
        </div>
      </div>

      {/* Routes List */}
      <div className="p-5 flex flex-col gap-2 overflow-y-auto max-h-[200px] border-b border-neutral-200/50 dark:border-neutral-800 stops-scroll">
        <h3 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
          Available Routes
        </h3>
        <div className="flex flex-col gap-1.5">
          {routes.map((route) => {
            const isSelected = route.route_id === selectedRouteId;
            return (
              <button
                key={route.route_id}
                onClick={() => onSelectRoute(route.route_id)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                    : 'bg-white/50 hover:bg-neutral-50 border-neutral-200 dark:bg-neutral-950/40 dark:border-neutral-800 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded-lg ${
                    isSelected
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                      : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
                  }`}>
                    {route.route_code}
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-sans text-xs font-bold truncate max-w-[150px] sm:max-w-none">
                      {route.route_name.split('via')[0]}
                    </span>
                    <span className="font-mono text-[10px] opacity-75">
                      {route.stops.length} Stops
                    </span>
                  </div>
                </div>

                {route.has_aircon && (
                  <span className={`font-mono text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300'
                  }`}>
                    Aircon
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Route Info & Stops list */}
      <div className="flex-1 overflow-y-auto p-5 stops-scroll">
        {selectedRoute ? (
          <m.div
            key={selectedRoute.route_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h4 className="font-sans text-sm font-black text-black dark:text-white">
                  Route {selectedRoute.route_code} Details
                </h4>
                {selectedRoute.has_aircon && (
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 font-mono text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase">
                    Airconditioned
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
                {selectedRoute.description}
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <h5 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Route Stops Sequence
              </h5>
              
              <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 ml-2 flex flex-col gap-3 py-1">
                {selectedRoute.stops.map((stop, idx) => (
                  <div key={stop.stop_id} className="relative flex items-start group">
                    {/* Bullet indicator */}
                    <span className="absolute -left-[23px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 transition-colors group-hover:border-blue-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 transition-colors group-hover:bg-blue-500"></span>
                    </span>
                    
                    <div className="flex flex-col leading-tight">
                      <span className="font-sans text-xs font-bold text-black dark:text-neutral-200 group-hover:text-blue-500 transition-colors">
                        {stop.stop_name}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500">
                        Stop #{stop.stop_sequence} • ({stop.lat.toFixed(4)}, {stop.lng.toFixed(4)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        ) : (
          <div className="flex items-center justify-center h-full text-center p-5">
            <p className="font-sans text-xs text-neutral-400 dark:text-neutral-500">
              Select a jeepney route code above to trace its path and view sequencing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
