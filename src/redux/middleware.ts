import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { logout, setToken } from "./session/sessionSlice";
import { KEYS } from "./keys";
import type { RootState } from "./store";
import type { SessionState } from "./session/types";

const EMPTY_JSON = JSON.stringify({});

export const sessionListenerMiddleware = createListenerMiddleware();

sessionListenerMiddleware.startListening({
  matcher: isAnyOf(setToken, logout),
  effect: (_action, listenerApi) => {
    window.localStorage.setItem(
      KEYS.session,
      JSON.stringify((listenerApi.getState() as RootState).auth)
    );
  }
});

export function preloadSession(): SessionState {
  const session = window.localStorage.getItem(KEYS.session);
  return JSON.parse(session ?? EMPTY_JSON);
}
