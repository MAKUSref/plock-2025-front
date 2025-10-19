import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { config } from "../config/config";
import { DEFAULT_MAP_SETTINGS } from "../config/defaultData";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentLocation } from "../redux/location/locationSlice";

export function useMap() {
  const dispatch = useAppDispatch();

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      ...DEFAULT_MAP_SETTINGS,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    geolocate.on("geolocate", (e) => {
      const coords = e.target._lastKnownPosition?.coords;
      if (!coords) return;
      const { longitude, latitude } = coords;
      dispatch(setCurrentLocation([longitude, latitude]));
    });

    mapRef.current.on("load", () => {
      mapRef.current?.setLanguage("pl");
      mapRef.current?.setLayoutProperty("country-label", "text-field", [
        "get",
        "name_pl",
      ]);
      geolocate.trigger();
    });

    mapRef.current.addControl(geolocate, "bottom-right");
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return {
    mapRef,
    mapContainerRef,
  };
}
