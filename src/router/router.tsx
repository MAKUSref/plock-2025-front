import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "./paths";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/Home";
import { MapPage } from "../pages/MapPage";
import { StartPage } from "../pages/StartPage";
import { MapLayout } from "../components/layouts/MapLayout";
import { TripListPage } from "../pages/trip/TripListPage";
import { TripPage } from "../pages/trip/TripPage";
import { SearchRoutePage } from "../pages/SearchRoute";
import { TripQuestionPage } from "../pages/trip/TripQuestionPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.START} element={<StartPage />} />
          <Route path={PATHS.MAP} element={<MapLayout />}>
            <Route index element={<MapPage />} />
          </Route>
          <Route path={PATHS.TRIP_LIST} element={<TripListPage />} />
          <Route path={PATHS.TRIP_PAGE} element={<TripPage />} />
          <Route path={PATHS.SEARCH_ROUTE} element={<SearchRoutePage />} />
          <Route path={PATHS.TRIP_QUESTION} element={<TripQuestionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
