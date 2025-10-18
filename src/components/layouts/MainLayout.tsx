import { Provider } from "react-redux";
import { Outlet } from "react-router";
import { store } from "../../redux/store";

export function MainLayout() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}
