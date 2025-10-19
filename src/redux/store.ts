import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session/sessionSlice";
import locationReducer from "./location/locationSlice";
import mapReducer from "./map/mapSlice";
import { preloadSession, sessionListenerMiddleware } from "./middleware";
import { baseApi } from "../api/baseApi/baseApi";
import { navigationApi } from "../api/navigationApi/navigationApi";
import tripReducer from "./slices/tripSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    trip: tripReducer,
    location: locationReducer,
    map: mapReducer,
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
