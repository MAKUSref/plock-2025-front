import "./globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);

        // Listen for updates
        registration.onupdatefound = () => {
          const installing = registration.installing;
          if (installing) {
            installing.addEventListener('statechange', () => {
              if (installing.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.log('New content is available; please refresh.');
                } else {
                  // Content cached for offline use
                  console.log('Content is cached for offline use.');
                }
              }
            });
          }
        };
      })
      .catch((err) => {
        console.warn('ServiceWorker registration failed: ', err);
      });
  });
}
