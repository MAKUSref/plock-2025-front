import "./globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
