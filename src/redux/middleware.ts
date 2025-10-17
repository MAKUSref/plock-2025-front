import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { logout, setToken } from "./session/sessionSlice";
import type { RootState } from "./store";
import type { SessionState } from "./session/types";

const SESSION_KEY = "session";

const EMPTY_JSON = JSON.stringify({});

export const sessionListenerMiddleware = createListenerMiddleware();

sessionListenerMiddleware.startListening({
  matcher: isAnyOf(setToken, logout),
  effect: (_action, listenerApi) => {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify((listenerApi.getState() as RootState).session)
    );
  }
});

export function preloadSession(): SessionState {
  const session = window.localStorage.getItem(SESSION_KEY);
  return JSON.parse(session ?? EMPTY_JSON);
}
