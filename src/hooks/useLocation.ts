import { useState, useEffect, useCallback } from "react";

interface Location {
  lat: number | null;
  lon: number | null;
}

export function useLocation() {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
        setLoading(false);
      },
    );
  }, []);

  // Automatically fetch location when the hook mounts
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { location, error, loading, refresh: getLocation };
}