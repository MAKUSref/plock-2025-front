import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "./paths";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/Home";
import { MapPage } from "../pages/MapPage";
import { StartPage } from "../pages/StartPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.MAP} element={<MapPage />} />
          <Route path={PATHS.START} element={<StartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
