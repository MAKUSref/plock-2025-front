import type { Coordinate } from "../../api/navigationApi/types";

export type Location = {
  location: Coordinate;
  name: string;
}

export type MapState = {
  searchResult?: Location;
  activeRouteIds?: string[];
};