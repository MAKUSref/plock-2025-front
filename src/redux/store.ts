import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session/sessionSlice";
import activeStepReducer from "./activeStepSlice";
import { preloadSession, sessionListenerMiddleware } from "./middleware";
import { baseApi } from "../api/baseApi/baseApi";
import { navigationApi } from "../api/navigationApi/navigationApi";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    activeStep: activeStepReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [navigationApi.reducerPath]: navigationApi.reducer,
  },
  preloadedState: {
    session: preloadSession(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sessionListenerMiddleware.middleware,
      baseApi.middleware,
      navigationApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
