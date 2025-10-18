import { Outlet } from "react-router";
import { Map } from "../organisms/Map";

export function MapLayout() {
  return (
    <div className="">
      <Outlet />
      <Map />
    </div>
  );
}
