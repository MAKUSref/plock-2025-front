import mapboxgl from "mapbox-gl";
import { useGetNearestBikeStationMutation } from "../api/baseApi/place/placeApi";
import type { Coordinate } from "../api/navigationApi/types";

export function useMapUtils(mapRef: React.RefObject<mapboxgl.Map | null>) {
  const [triggerGetNearestBikeStation] = useGetNearestBikeStationMutation();

  const flyToBound = (start: [number, number], end: [number, number]) => {
    if (!mapRef.current) return;
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend(start);
    bounds.extend(end);
    mapRef.current.fitBounds(bounds, {
      padding: 100,
      duration: 1000,
    });
  };

  const getNearestBikeStation = async (location: Coordinate) => {
    const result = await triggerGetNearestBikeStation({ location }).unwrap();
    return result;
  };

  return { flyToBound, getNearestBikeStation };
}
