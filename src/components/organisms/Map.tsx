import { useEffect } from "react";
import { useMap } from "../../hooks/useMap";
import { useRouteLayer } from "../../hooks/useRouteLayer";
import type { Coordinate } from "../../api/navigationApi/types";
import GLOBAL_ROUTES_JSON from "../../assets/bike_paths_global.json";
import BIKE_STATIONS_JSON from "../../assets/bike_stations.json";
import { useObjectLayer } from "../../hooks/useObjectLayer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setActiveRoutes } from "../../redux/map/mapSlice";

export function Map() {
  const { searchResult, activeRoutes } = useAppSelector((state) => state.map);
  const { mapContainerRef, mapRef } = useMap();
  const {
    addRouteLayer,
    // generateBasicBikeRoute,
    removeRouteLayer,
    generateWalkAndBikeRoute,
  } = useRouteLayer(mapRef);
  const { addBikeStation: addStation } = useObjectLayer(mapRef);
  const dispatch = useAppDispatch();

  // Load global plock routes
  useEffect(() => {
    addRouteLayer(GLOBAL_ROUTES_JSON, {
      "line-color": "#1c36c9",
      "line-opacity": 0.5,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add bike stations
  useEffect(() => {
    BIKE_STATIONS_JSON.features.forEach(({ geometry }) => {
      addStation(geometry.coordinates as Coordinate);
    });
  }, []);

  useEffect(() => {
    activeRoutes?.forEach((route) => {
      removeRouteLayer(route.id);
    });
    if (!searchResult) return;
    generateWalkAndBikeRoute(searchResult.location).then((ids) => {
      dispatch(setActiveRoutes(ids));
    });
  }, [searchResult]);

  return <div className="absolute h-dvh w-full" ref={mapContainerRef}></div>;
}
