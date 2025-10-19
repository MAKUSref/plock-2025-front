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
  }),
});

export const {
  useGetNearestBikeStationMutation
} = authApi;
