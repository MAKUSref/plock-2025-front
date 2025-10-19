import type { Coordinate } from "../../navigationApi/types";
import { baseApi } from "../baseApi";
import type { Place } from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNearestBikeStation: builder.mutation<Place, { location: Coordinate }>({
      query: ({ location }) => ({
        url: "/places/nearest-station",
        method: "POST",
        body: [location[0], location[1]],
      }),
    }),
    getPlacesByTag: builder.mutation<Place[], { tag: string }>({
      query: ({ tag }) => ({
        url: `/places/tag/${tag}`,
        method: "GET",
      }),
    }),
    getStations: builder.mutation<Place[], void>({
      query: () => ({
        url: `/places/tag/stations`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetNearestBikeStationMutation,
  useGetPlacesByTagMutation,
  useGetStationsMutation,
} = authApi;
