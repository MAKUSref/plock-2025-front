import { useMap } from "../../hooks/useMap";

export function Map() {
  const { mapContainerRef } = useMap();

  return <div className="absolute h-dvh w-full" ref={mapContainerRef}></div>;
}
