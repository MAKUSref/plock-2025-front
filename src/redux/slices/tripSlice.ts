import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Trip } from "../../pages/trip/trips";

const initialState: { trip: Trip | null } = {
  trip: null,
};

export const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip: (state, action: PayloadAction<Trip>) => {
      state.trip = action.payload;
    },
    clearTrip: (state) => {
      state.trip = null;
    },
  },
});

export const { setTrip, clearTrip } = tripSlice.actions;
export default tripSlice.reducer;
