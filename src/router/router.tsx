import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "./paths";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/Home";
import { MapPage } from "../pages/MapPage";
import { StartPage } from "../pages/StartPage";
import { TripListPage } from "../pages/trip/TripListPage";
import { TripPage } from "../pages/trip/TripPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.MAP} element={<MapPage />} />
          <Route path={PATHS.START} element={<StartPage />} />
          \ <Route path={PATHS.TRIP_LIST} element={<TripListPage />} />
          <Route path={PATHS.TRIP_PAGE} element={<TripPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
