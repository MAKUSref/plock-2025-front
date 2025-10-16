import { BrowserRouter, Route, Routes } from "react-router";
import { PATHS } from "./paths";
import { SubPage } from "../components/pages/SubPage";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomePage } from "../components/pages/Home";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.SUB_PAGE} element={<SubPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
