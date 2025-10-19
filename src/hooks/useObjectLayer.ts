import type { Coordinate } from "../api/navigationApi/types";
import type React from "react";
import STATION_ICON from "../assets/icons/station.png";
import PLACE_TO_VISIT_ICON from "../assets/icons/place_to_visit.png";
import PLACE_TO_REST_ICON from "../assets/icons/place_to_rest.png";
import PARK_ICON from "../assets/icons/park.png";
import MUSEUM_ICON from "../assets/icons/museum.png";
import REPAIR_ICON from "../assets/icons/repair_station.png";
import ALERT_ICON from "../assets/icons/alert.png";

export function useObjectLayer(mapRef: React.RefObject<mapboxgl.Map | null>) {
  const addLazyPlace = (coords: Coordinate, image: string) => {
    const id = crypto.randomUUID();
    if (!mapRef.current) return id;

    mapRef.current.on("load", () => {
      mapRef.current?.loadImage(image, (err, image) => {
        if (err) throw err;
        mapRef.current?.addImage(`image-${id}`, image!);

        mapRef.current?.addSource(`point-${id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: coords,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any,
            ],
          },
        });

        mapRef.current?.addLayer({
          id: `point-${id}`,
          type: "symbol",
          source: `point-${id}`,
          layout: {
            "icon-image": `image-${id}`,
            // "icon-size": 0.07,
            "icon-size": 1,
          },
        });
        return id;
      });
    });
  };

  const addPlace = (coords: Coordinate, image: string) => {
    const id = crypto.randomUUID();
    if (!mapRef.current) return id;

    mapRef.current?.loadImage(image, (err, image) => {
      if (err) throw err;
      mapRef.current?.addImage(`image-${id}`, image!);

      mapRef.current?.addSource(`point-${id}`, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: coords,
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ],
        },
      });

      
      mapRef.current?.addLayer({
        id: `point-${id}`,
        type: "symbol",
        source: `point-${id}`,
        layout: {
          "icon-image": `image-${id}`,
          // "icon-size": 0.07,
          "icon-size": 1,
        },
      });
      return id;
    });
  };

  const addBikeStation = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, STATION_ICON);
    }
    return addPlace(coords, STATION_ICON);
  };

  const addPlaceToVisit = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, PLACE_TO_VISIT_ICON);
    }
    return addPlace(coords, PLACE_TO_VISIT_ICON);
  };

  const addPlaceToRest = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, PLACE_TO_REST_ICON);
    }
    return addPlace(coords, PLACE_TO_REST_ICON);
  };

  const addPark = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, PARK_ICON);
    }
    return addPlace(coords, PARK_ICON);
  };

  const addMuseum = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, MUSEUM_ICON);
    }
    return addPlace(coords, MUSEUM_ICON);
  };
  const addRepairStation = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, REPAIR_ICON);
    }
    return addPlace(coords, REPAIR_ICON);
  };
  const addAlert = (coords: Coordinate, lazy?: boolean) => {
    if (lazy) {
      return addLazyPlace(coords, ALERT_ICON);
    }
    return addPlace(coords, ALERT_ICON);
  };

  return { addBikeStation, addPlaceToVisit, addPlaceToRest, addPark, addMuseum, addRepairStation, addAlert };
}
