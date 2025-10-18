import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { config } from "../config/config";
import { DEFAULT_MAP_SETTINGS } from "../config/defaultData";
import { useGetRouteQuery } from "../api/navigationApi/navigationApi";
import type { Coordinate } from "../api/navigationApi/types";

const START: Coordinate = [19.5858018, 52.4823373];
const END: Coordinate = [19.601562, 52.4823373];

export function useMap() {
  const { data } = useGetRouteQuery({ start: START, end: END });

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  console.log(data);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      ...DEFAULT_MAP_SETTINGS,
      center: [19.5858018, 52.4823373],
    });

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!data || !mapRef.current) return;
    mapRef.current.on("load", () => {
      mapRef.current?.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: data.routes[0].geometry,
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    });
  }, [data]);

  return {
    mapRef,
    mapContainerRef,
  };
}
