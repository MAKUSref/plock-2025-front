import { createSlice } from "@reduxjs/toolkit";

interface AchievementState {
  isAvailable: boolean;
  new: boolean;
}

const initialState: AchievementState = {
  isAvailable: false,
  new: false,
};

const achievementSlice = createSlice({
  name: "achievementSlice",
  initialState,
  reducers: {
    setAchievementAvailable: (state, action) => {
      state.isAvailable = action.payload;
    },
    setAchievementNew: (state, action) => {
      state.new = action.payload;
    },
  },
});

export const { setAchievementAvailable, setAchievementNew } =
  achievementSlice.actions;

export default achievementSlice.reducer;
