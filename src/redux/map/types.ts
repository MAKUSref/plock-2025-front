import type { Coordinate, Step } from "../../api/navigationApi/types";

export type Location = {
  location: Coordinate;
  name: string;
}

export type RouteData = {
  type: "pedestrian" | "cycling";
  distance: number;
  duration: number;
  steps: Step[];
}

export type Route = {
  id: string;
  state: "idle" | "pending" | "done";
  details?: RouteData;
}

export type MapState = {
  bikeType: "city" | "private";
  searchResult?: Location;
  activeRoutes?: Route[];
};