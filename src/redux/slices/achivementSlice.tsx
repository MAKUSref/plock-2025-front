import { createSlice } from "@reduxjs/toolkit";

interface AchievementState {
  isAvailable: boolean;
}

const initialState: AchievementState = {
  isAvailable: false,
};

const achievementSlice = createSlice({
  name: "achievementSlice",
  initialState,
  reducers: {
    setAchievementAvailable: (state, action) => {
      state.isAvailable = action.payload;
    },
  },
});

export const { setAchievementAvailable } = achievementSlice.actions;

export default achievementSlice.reducer;
