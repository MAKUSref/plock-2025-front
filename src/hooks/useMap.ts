import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { config } from "../config/config";
import { DEFAULT_MAP_SETTINGS } from "../config/defaultData";

export function useMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      ...DEFAULT_MAP_SETTINGS,
    });

    mapRef.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    }));

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return {
    mapRef,
    mapContainerRef,
  }
}