import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session/sessionSlice";
import locationReducer from "./location/locationSlice";
import mapReducer from "./map/mapSlice";
import { preloadSession, sessionListenerMiddleware } from "./middleware";
import activeStepReducer from "./slices/activeStepSlice";
import achievementReducer from "./slices/achivementSlice";
import { baseApi } from "../api/baseApi/baseApi";
import { navigationApi } from "../api/navigationApi/navigationApi";
import tripReducer from "./slices/tripSlice";
import { searchApi } from "../api/searchApi/searchApi";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    trip: tripReducer,
    location: locationReducer,
    activeStep: activeStepReducer,
    achievement: achievementReducer,
    map: mapReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [navigationApi.reducerPath]: navigationApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  preloadedState: {
    session: preloadSession(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sessionListenerMiddleware.middleware,
      baseApi.middleware,
      navigationApi.middleware,
      searchApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
