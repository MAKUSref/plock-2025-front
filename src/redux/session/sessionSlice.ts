import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SessionState } from "./types";

const initialState: SessionState = {
  distance: 0,
  calories: 0,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = undefined;
    },
    addDistance: (state, action: PayloadAction<number>) => {
      state.distance = (state.distance ?? 0) + action.payload;
    },
    addCalories: (state, action: PayloadAction<number>) => {
      state.calories = (state.calories ?? 0) + action.payload;
    },
  },
});

export const { setToken, logout, addDistance, addCalories } =
  sessionSlice.actions;
export default sessionSlice.reducer;
