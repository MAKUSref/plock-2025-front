import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { config } from "../../config/config";
import { DEFAULT_MAP_SETTINGS } from "../../config/defaultData";

export function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      ...DEFAULT_MAP_SETTINGS,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return <div className="absolute h-dvh w-full" ref={mapContainerRef}></div>;
}
