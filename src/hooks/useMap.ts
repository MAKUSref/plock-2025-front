import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useEffect, useRef } from "react";
import { config } from "../config/config";
import { DEFAULT_MAP_SETTINGS } from "../config/defaultData";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentLocation } from "../redux/location/locationSlice";
import { setSearchResult } from "../redux/map/mapSlice";

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

    mapRef.current.setLanguage("pl");
    mapRef.current.setLayoutProperty("country-label", "text-field", [
      "get",
      "name_pl",
    ]);

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right"
    );
    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        useBrowserFocus: true,
      }),
      "top"
    );
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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      useBrowserFocus: true,
    });

    geocoder.on("result", (e) => {
      dispatch(setSearchResult({
        location: e.result.center as [number, number],
        name: e.result.place_name,
      }))
    })

    mapRef.current.addControl(geolocate, "bottom-right");
    mapRef.current.addControl(geocoder, "top");
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return {
    mapRef,
    mapContainerRef,
  };
}
