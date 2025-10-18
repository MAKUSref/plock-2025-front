import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "./paths";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../pages/Home";
import { MapPage } from "../pages/MapPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.MAP} element={<MapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
