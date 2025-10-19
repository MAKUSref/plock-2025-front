import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MapState, Location, Route } from "./types";

const initialState: MapState = {};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<Location>) => {
      state.searchResult = action.payload;
    },

    setActiveRoutes: (state, action: PayloadAction<string[] | undefined>) => {
      // state.activeRoutes = action.payload;
    },
  },
});

export const { setSearchResult, setActiveRoutes } = mapSlice.actions;
export default mapSlice.reducer;
