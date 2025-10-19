import { useEffect } from "react";
import { useMap } from "../../hooks/useMap";
import { useRouteLayer } from "../../hooks/useRouteLayer";
import type { Coordinate } from "../../api/navigationApi/types";
import GLOBAL_ROUTES_JSON from "../../assets/bike_paths_global.json";
import BIKE_STATIONS_JSON from "../../assets/bike_stations.json";
import { useObjectLayer } from "../../hooks/useObjectLayer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setActiveRoutes } from "../../redux/map/mapSlice";
import { useGetPlacesByTagQuery } from "../../api/baseApi/place/placeApi";
import { useGetTripByIdQuery } from "../../api/baseApi/trip/tripApi";
import { useSearchParams } from "react-router";

export function Map() {
  const [searchParams] = useSearchParams();
  const { searchResult, activeRoutes, bikeType } = useAppSelector(
    (state) => state.map
  );
  const { mapContainerRef, mapRef } = useMap();
  const {
    addRouteLayer,
    generateBasicBikeRoute,
    removeRouteLayer,
    generateWalkAndBikeRoute,
    generateBasicMultipartBikeRoute,
  } = useRouteLayer(mapRef);
  const dispatch = useAppDispatch();
  const { addBikeStation: addStation, addPlaceToRest } = useObjectLayer(mapRef);
  const { data: restingPlaces } = useGetPlacesByTagQuery({
    tag: "resting_place",
  });
  const { data: tripData } = useGetTripByIdQuery({
    tripId: searchParams.get("tripId") || "",
  });

  // Load global płock routes
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
      addStation(geometry.coordinates as Coordinate, true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    restingPlaces?.forEach((place) => {
      const coord = [place.coordinates[1], place.coordinates[0]] as Coordinate;
      addPlaceToRest(coord);
    });
  }, [restingPlaces]);

  useEffect(() => {
    activeRoutes?.forEach((route) => {
      removeRouteLayer(route.id);
    });
    if (!searchResult) return;
    if (bikeType === "city") {
      generateWalkAndBikeRoute(searchResult.location).then((ids) => {
        dispatch(setActiveRoutes(ids));
      });
    } else {
      const ids = generateBasicBikeRoute(searchResult.location);
      dispatch(setActiveRoutes(ids));
    }
  }, [searchResult]);

  useEffect(() => {
    if (!tripData) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const coords = (tripData as any).trip.waypoints.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (wp: any) => wp.coordinates
    );
    generateBasicMultipartBikeRoute(coords);
  }, [tripData]);

  return <div className="absolute h-dvh w-full" ref={mapContainerRef}></div>;
}
