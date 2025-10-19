import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MapState, Location } from "./types";

const initialState: MapState = {};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<Location>) => {
      state.searchResult = action.payload;
    },

    setActiveRouteIds: (state, action: PayloadAction<string[] | undefined>) => {
      state.activeRouteIds = action.payload;
    },
  },
});

export const { setSearchResult, setActiveRouteIds } = mapSlice.actions;
export default mapSlice.reducer;
