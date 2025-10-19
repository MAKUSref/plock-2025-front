import type { GenerateTripData, Trip } from "./types";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrips: builder.query<void, void>({
      query: () => ({
        url: "/trips",
        method: "GET",
      }),
    }),
    getTripById: builder.query<void, { tripId: string }>({
      query: ({ tripId }) => ({
        url: `/trips/${tripId}`,
        method: "GET",
      }),
    }),
    createTrip: builder.mutation<void, Trip>({
      query: () => ({
        url: "/trips",
        method: "POST",
      }),
    }),
    generateTrip: builder.mutation<Trip, GenerateTripData>({
      query: (data) => ({
        url: "/trips/generate",
        method: "POST",
        body: data,
      }),
    }),
    updateTrip: builder.mutation<void, Trip>({
      query: (trip) => ({
        url: `/trips/${trip._id}`,
        method: "PUT",
        body: trip,
      }),
    }),
    deleteTrip: builder.mutation<void, { tripId: string }>({
      query: ({ tripId }) => ({
        url: `/trips/${tripId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllTripsQuery,
  useGetTripByIdQuery,
  useCreateTripMutation,
  useGenerateTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
} = authApi;
