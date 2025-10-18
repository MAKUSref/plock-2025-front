import type { RootState } from "../../redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetRouteRequest, GetRouteResponse } from "./types";
import { config } from "../../config/config";

const NAVIGATION_API_URL =
  "https://api.mapbox.com/directions/v5/mapbox/cycling/";

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
    getRoute: builder.query<GetRouteResponse, GetRouteRequest>({
      query: ({ start, end }) => ({
        url: `${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${config.MAPBOX_ACCESS_TOKEN}`,
      }),
    }),
  }),
});

export const { useGetRouteQuery } = navigationApi;
