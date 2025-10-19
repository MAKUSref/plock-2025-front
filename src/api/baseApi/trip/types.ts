import type { Place, PlaceTag } from "../place/types";


export type TripType = "sport" | "cultural" | "nature";

export type Trip = {
  _id: string;
  type: TripType;
  name: string;
  description: string;
  image: string; // URL lub ścieżka do obrazka
  distanceKm: number; // ilość km
  durationHours: number; // długość w godzinach (np. 1 = 1h)
  waypoints: Place[];
  path?: GeoJSON.Geometry;
};


export type GenerateTripData = {
    "time": number; // in hours
    "type": TripType;
    "tags": PlaceTag[]; // [lat, lng]
};