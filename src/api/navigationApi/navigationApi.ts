import type { RootState } from "../../redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetMultiPartRoute,
  GetRouteRequest,
  GetRouteResponse,
} from "./types";
import { config } from "../../config/config";

const NAVIGATION_API_URL = "https://api.mapbox.com/directions/v5/mapbox/";

const baseQuery = fetchBaseQuery({
  baseUrl: NAVIGATION_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const session = (getState() as RootState).session;
    if (session.token) {
      headers.set("Authorization", `Bearer ${session.token}`);
    }
    return headers;
  },
});

export const navigationApi = createApi({
  reducerPath: "navigationApi",
  baseQuery,
  tagTypes: ["path"],
  endpoints: (builder) => ({
    getMultiPartRoute: builder.query<GetRouteResponse, GetMultiPartRoute>({
      query: ({ coords }) => ({
        url: `cycling/${coords
          .map((coord) => coord.join(","))
          .join(";")}?steps=true&geometries=geojson&access_token=${
          config.MAPBOX_ACCESS_TOKEN
        }`,
      }),
    }),

    getRoute: builder.query<
      GetRouteResponse,
      GetRouteRequest & { type?: "cycling" | "walking" }
    >({
      query: ({ start, end, type = "cycling" }) => ({
        url: `${type}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${config.MAPBOX_ACCESS_TOKEN}`,
      }),
    }),

    getGeocoding: builder.query<void, string>({
      query: (query) => ({
        url: `cycling/${encodeURIComponent(query)}.json?access_token=${
          config.MAPBOX_ACCESS_TOKEN
        }&autocomplete=true&limit=5`,
      }),
    }),
  }),
});

export const {
  useGetRouteQuery,
  useLazyGetRouteQuery,
  useGetGeocodingQuery,
  useLazyGetGeocodingQuery,
} = navigationApi;
