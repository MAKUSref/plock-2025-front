import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationState } from "./types";

const initialState: LocationState = {};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<[number, number]>) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
