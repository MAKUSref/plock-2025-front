import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { AppRouter } from "./router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
