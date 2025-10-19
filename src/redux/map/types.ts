import type { Coordinate } from "../../api/navigationApi/types";

export type Location = {
  location: Coordinate;
  name: string;
}

export type Route = {
  id: string;
  isActive: boolean;
  data?: GeoJSON.FeatureCollection;
}

export type MapState = {
  searchResult?: Location;
  activeRoutes?: Route[];
};