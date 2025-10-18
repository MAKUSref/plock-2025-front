import { useEffect } from "react";
import { useMap } from "../../hooks/useMap";
import { useRouteLayer } from "../../hooks/useRouteLayer";
import { useLazyGetRouteQuery } from "../../api/navigationApi/navigationApi";
import { useLocation } from "../../hooks/useLocation";
import type { Coordinate } from "../../api/navigationApi/types";
import GLOBAL_ROUTES_JSON from "../../assets/bike_paths_global.json";
import BIKE_STATIONS_JSON from "../../assets/bike_stations.json";
import { useObjectLayer } from "../../hooks/useObjectLayer";

const END: Coordinate = [19.601562, 52.4823373];

export function Map() {
  const { location } = useLocation();
  const [triggerRouteQuery] = useLazyGetRouteQuery();
  
  const { mapContainerRef, mapRef } = useMap();
  const { addRouteLayer } = useRouteLayer(mapRef);
  const { addBikeStation: addStation } = useObjectLayer(mapRef);

  // Load global plock routes
  useEffect(() => {
    addRouteLayer(GLOBAL_ROUTES_JSON, {
      "line-color": "#1c36c9",
      "line-opacity": 0.5,
    });
  }, []);

  // Create route at your location
  useEffect(() => {
    if (!location.lat || !location.lon) return;
    const start: Coordinate = [location.lon, location.lat];
    triggerRouteQuery({ start, end: END }).then(({ data }) => {
      addRouteLayer({
        type: "Feature",
        properties: {},
        geometry: data?.routes[0].geometry,
      });
    });
  }, [location]);

  // Add station at your location
  useEffect(() => {
    BIKE_STATIONS_JSON.features.forEach(({ geometry }) => {
      addStation(geometry.coordinates as Coordinate);
    });
  }, []);

  return <div className="absolute h-dvh w-full" ref={mapContainerRef}></div>;
}
