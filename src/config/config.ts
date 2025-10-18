export const config = {
  BACKEND_URL:
    (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:3000",
  MAPBOX_ACCESS_TOKEN:
    (import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string) || "",
};
