import { useLazyGetRouteQuery } from "../api/navigationApi/navigationApi";
import type { Coordinate } from "../api/navigationApi/types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addDetailsToRoute } from "../redux/map/mapSlice";
import { useMapUtils } from "./useMapUtils";

const DEFAULT_PAINT = {
  "line-color": "#1eba2b",
  "line-width": 5,
  "line-opacity": 0.75,
};

export function useRouteLayer(mapRef: React.RefObject<mapboxgl.Map | null>) {
  const { currentLocation } = useAppSelector((state) => state.location);
  const [triggerRouteQuery] = useLazyGetRouteQuery();
  const { flyToBound, getNearestBikeStation } = useMapUtils(mapRef);
  const dispatch = useAppDispatch();

  const addRouteLayer = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    paint?: mapboxgl.PaintSpecification
  ) => {
    const id = `line-layer-${crypto.randomUUID()}`;
    if (!mapRef.current) return id;
    mapRef.current.on("load", () => {
      mapRef.current?.addLayer({
        id,
        type: "line",
        source: {
          type: "geojson",
          data,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          ...DEFAULT_PAINT,
          ...paint,
        },
      });
    });
    return id;
  };

  const removeRouteLayer = (id: string) => {
    if (!mapRef.current) return;
    if (mapRef.current.getLayer(id)) {
      mapRef.current.removeLayer(id);
    }
    if (mapRef.current.getSource(id)) {
      mapRef.current.removeSource(id);
    }
  };

  const generateWalkRoute = (start: Coordinate, end: Coordinate) => {
    const id = crypto.randomUUID();
    triggerRouteQuery({ start, end, type: "walking" }).then(({ data }) => {
      if (data) {
        dispatch(
          addDetailsToRoute({
            id,
            data: {
              distance: data.routes[0].distance,
              duration: data.routes[0].duration,
              steps: data.routes[0].legs[0].steps,
              type: "pedestrian",
            },
          })
        );
      }

      mapRef.current?.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/pattern-dot.png",
        (error, image) => {
          if (error) throw error;
          mapRef.current!.addImage("pattern-dot", image!);
          mapRef.current!.addSource(`route-data-${id}`, {
            lineMetrics: true,
            type: "geojson",
            data: data?.routes[0].geometry,
          });

          const lineBaseWidth = 14;

          mapRef.current!.addLayer({
            id,
            type: "line",
            source: `route-data-${id}`,
            slot: "middle",
            layout: {
              "line-join": "none",
            },
            paint: {
              "line-pattern": "pattern-dot",
              "line-width": [
                "interpolate",
                ["exponential", 2],
                ["zoom"],
                0,
                lineBaseWidth * 1,
                0.9999,
                lineBaseWidth * 2,
                1,
                lineBaseWidth * 1,
                1.9999,
                lineBaseWidth * 2,
                2,
                lineBaseWidth * 1,
                2.9999,
                lineBaseWidth * 2,
                3,
                lineBaseWidth * 1,
                3.9999,
                lineBaseWidth * 2,
                4,
                lineBaseWidth * 1,
                4.9999,
                lineBaseWidth * 2,
                5,
                lineBaseWidth * 1,
                5.9999,
                lineBaseWidth * 2,
                6,
                lineBaseWidth * 1,
                6.9999,
                lineBaseWidth * 2,
                7,
                lineBaseWidth * 1,
                7.9999,
                lineBaseWidth * 2,
                8,
                lineBaseWidth * 1,
                8.9999,
                lineBaseWidth * 2,
                9,
                lineBaseWidth * 1,
                9.9999,
                lineBaseWidth * 2,
                10,
                lineBaseWidth * 1,
                10.9999,
                lineBaseWidth * 2,
                11,
                lineBaseWidth * 1,
                11.9999,
                lineBaseWidth * 2,
                12,
                lineBaseWidth * 1,
                12.9999,
                lineBaseWidth * 2,
                13,
                lineBaseWidth * 1,
                13.9999,
                lineBaseWidth * 2,
                14,
                lineBaseWidth * 1,
                14.9999,
                lineBaseWidth * 2,
                15,
                lineBaseWidth * 1,
                15.9999,
                lineBaseWidth * 2,
                16,
                lineBaseWidth * 1,
                16.9999,
                lineBaseWidth * 2,
                17,
                lineBaseWidth * 1,
                17.9999,
                lineBaseWidth * 2,
                18,
                lineBaseWidth * 1,
                18.9999,
                lineBaseWidth * 2,
                19,
                lineBaseWidth * 1,
                19.9999,
                lineBaseWidth * 2,
                20,
                lineBaseWidth * 1,
                20.9999,
                lineBaseWidth * 2,
                21,
                lineBaseWidth * 1,
                22,
                lineBaseWidth * 2,
              ],
            },
          });
        }
      );
    });
    return id;
  };

  const generateBikeRoute = (start: Coordinate, end: Coordinate) => {
    const id = crypto.randomUUID();
    triggerRouteQuery({
      start,
      end,
    }).then(({ data }) => {
      if (data) {
        dispatch(
          addDetailsToRoute({
            id,
            data: {
              distance: data.routes[0].distance,
              duration: data.routes[0].duration,
              steps: data.routes[0].legs[0].steps,
              type: "cycling",
            },
          })
        );
      }

      mapRef.current?.addLayer({
        id,
        type: "line",
        source: {
          type: "geojson",
          data: data?.routes[0].geometry,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff0000",
          "line-width": 6,
          "line-opacity": 0.9,
        },
      });
    });
    return id;
  };

  const generateWalkAndBikeRoute = async (end: Coordinate) => {
    if (!currentLocation) return;
    const nearestBikeStation = await getNearestBikeStation(currentLocation);
    const nearestEndBikeStation = await getNearestBikeStation(end);

    const walkToBikeStationId = generateWalkRoute(
      currentLocation,
      nearestBikeStation.coordinates
    );
    const bikeRouteId = generateBikeRoute(
      nearestBikeStation.coordinates as Coordinate,
      nearestEndBikeStation.coordinates as Coordinate
    );
    const walkFromBikeStationId = generateWalkRoute(
      nearestEndBikeStation.coordinates as Coordinate,
      end
    );

    flyToBound(currentLocation, end as [number, number]);
    return [walkToBikeStationId, bikeRouteId, walkFromBikeStationId];
  };

  const generateBasicBikeRoute = (end: Coordinate) => {
    if (!currentLocation) return;
    const bikeId = generateBikeRoute(currentLocation, end);
    flyToBound(currentLocation, end as [number, number]);
    return [bikeId];
  };

  return {
    addRouteLayer,
    removeRouteLayer,
    generateBasicBikeRoute,
    generateWalkAndBikeRoute,
  };
}
