import type { Coordinate } from "../../navigationApi/types";

export type PlaceTag =
  | "park"
  | "museum"
  | "restaurant"
  | "historical_site"
  | "entertainment"
  | "church"
  | "station";

export type Place = {
  coordinates: Coordinate;
  name: string;
  description?: string;
  tags?: PlaceTag[];
};
