import { Provider } from "react-redux";
import { Outlet } from "react-router";
import { store } from "../../redux/store";
import { ConfigProvider } from "antd";
import { theme } from "../../theme";

export function MainLayout() {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ConfigProvider>
  );
}
