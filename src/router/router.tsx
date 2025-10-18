import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "./paths";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/Home";
import { MapPage } from "../pages/MapPage";
import { StartPage } from "../pages/StartPage";
import { TripQuestionPage } from "../pages/trip/TripQuestionPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.MAP} element={<MapPage />} />
          <Route path={PATHS.START} element={<StartPage />} />
          <Route path={PATHS.TRIP_QUESTION} element={<TripQuestionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
