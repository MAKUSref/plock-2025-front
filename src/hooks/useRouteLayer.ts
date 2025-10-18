const DEFAULT_PAINT = {
  "line-color": "#1eba2b",
  "line-width": 5,
  "line-opacity": 0.75,
};

export function useRouteLayer(mapRef: React.RefObject<mapboxgl.Map | null>) {
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

  return { addRouteLayer, removeRouteLayer };
}
