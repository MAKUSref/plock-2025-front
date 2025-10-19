import { createSlice } from "@reduxjs/toolkit";

interface ActiveStepState {
  value: number;
}

const initialState: ActiveStepState = {
  value: 0,
};

export const activeStepSlice = createSlice({
  name: "activeStep",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.value += 1;
    },
    prevStep: (state) => {
      if (state.value > 0) state.value -= 1;
    },
    clearSteps: (state) => {
      state.value = 0;
    }
  },
});

export const { nextStep, prevStep, clearSteps } = activeStepSlice.actions;
export default activeStepSlice.reducer;
