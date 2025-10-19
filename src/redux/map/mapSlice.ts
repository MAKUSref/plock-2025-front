import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MapState, Location, RouteData } from "./types";

const initialState: MapState = {};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<Location>) => {
      state.searchResult = action.payload;
    },

    setActiveRoutes: (state, action: PayloadAction<string[] | undefined>) => {
      state.activeRoutes = action.payload?.map((id) => ({
        id,
        state: "idle",
      }));
    },

    addDetailsToRoute: (
      state,
      action: PayloadAction<{ id: string; data: RouteData }>
    ) => {
      const route = state.activeRoutes?.find(
        (route) => route.id === action.payload.id
      );
      if (route) {
        route.details = action.payload.data;
      }
    },
  },
});

export const { setSearchResult, setActiveRoutes, addDetailsToRoute } =
  mapSlice.actions;
export default mapSlice.reducer;
