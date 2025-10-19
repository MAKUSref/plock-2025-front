import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";

const SEARCH_API_URL = "https://api.mapbox.com/search/geocode/v6/forward";

const baseQuery = fetchBaseQuery({
  baseUrl: SEARCH_API_URL,
});

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery,
  endpoints: (builder) => ({
    searchLocation: builder.query<
      void,
      {
        query: string;
        proximity: {
          latitude: number;
          longitude: number;
        };
      }
    >({
      query: ({ query, proximity }) => ({
        url: `?language=pl&q=${encodeURIComponent(
          query
        )}&country=PL&proximity=${proximity.latitude},${
          proximity.longitude
        }&access_token=${config.MAPBOX_ACCESS_TOKEN}`,
      }),
    }),
  }),
});

export const { useSearchLocationQuery, useLazySearchLocationQuery } = searchApi;
