export type Coordinate = [number | string, number | string];

export type GetRouteRequest = {
  start: Coordinate;
  end: Coordinate;
};

export type GetRouteResponse = {
  routes: Route[];
  code: string;
  uuid: string;
  waypoints: Waypoint[];
}

export type Route = {
  distance: number;
  duration: number;
  weight: number;
  weight_name: string;
  geometry: GeoJSON.Geometry;
  legs: Leg[];
};

export type Leg = {
  distance: number;
  duration: number;
  summary: string;
  weight: number;
  steps: Step[];
  admins: {
    iso_3166_1: string;
    iso_3166_1_alpha3: string;
  }[];
  via_waypoints: Waypoint[];
};

export type Step = {
  distance: number;
  duration: number;
  driving_side: "left" | "right";
  geometry: GeoJSON.Geometry;
  maneuver: Maneuver;
  // intersection is omitted
}

export type Maneuver = {
  instruction: string;
  location: Coordinate;
  bearing_before: number;
  bearing_after: number;
  type: string;
};

export type Waypoint = {
  distance: number;
  name: string;
  location: Coordinate;
};
