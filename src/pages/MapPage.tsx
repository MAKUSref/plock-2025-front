import { EnvironmentOutlined, WarningOutlined } from "@ant-design/icons";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";
import { useMemo } from "react";
import { BackBtn } from "../components/atoms/BackBtn";
import { RideProgress } from "../components/molecules/RideProgress";
import { Button } from "antd";

export function MapPage() {
  const { searchResult, activeRoutes } = useAppSelector((state) => state.map);

  const minutes = useMemo(() => {
    return Math.floor(
      (activeRoutes
        ?.map((route) => route.details?.duration)
        .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0) / 60
    );
  }, [activeRoutes]);

  const arrivalTime = useMemo(() => {
    return dayjs().add(minutes, "minute").format("HH:mm");
  }, [minutes]);

  const duration = useMemo(() => {
    if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} h ${mins} min`;
    }

    return `${minutes} min`;
  }, [minutes]);

  const distance = useMemo(() => {
    const meters =
      activeRoutes
        ?.map((route) => route.details?.distance)
        .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    return (meters / 1000).toFixed(1);
  }, [activeRoutes]);

  const directions = useMemo(() => {
    return activeRoutes
      ? activeRoutes[0]?.details?.steps[0].maneuver.instruction ??
          "Za 30 m, skręć w lewo."
      : "Za 30 m, skręć w lewo.";
  }, [activeRoutes]);

  return (
    <>
      <div className="absolute z-20 top-5 left-5">
        <BackBtn />
      </div>
      <div className="absolute z-20 bottom-0 w-full">
        <div className=" flex justify-end px-4 pb-2 pt-2">
          <Button shape="circle" size="large" icon={<WarningOutlined />} />
        </div>
        <div className="px-2 pb-2">
          <RideProgress />
        </div>
        <div className=" box rounded-t-4xl bg-white">
          {searchResult && (
            <div className="flex items-center gap-4">
              <div className="rounded-full size-12 border border-gray-200 flex items-center justify-center">
                <EnvironmentOutlined className="text-xl" />
              </div>
              <div className="">
                <p className="text-xs">{searchResult?.name.split(",")[0]}</p>
                <p className="text-xs">{searchResult?.name.split(",")[1]}</p>
              </div>
            </div>
          )}
          <div className="rounded-3xl bg-[#13E49A] mt-6">
            <p className="text-white  p-4 font-bold text-2xl">{directions}</p>
          </div>

          <div className="flex justify-around my-4">
            <div className="text-center">
              <p className="text-xs mb-1 mt-4">Dystans</p>
              <p>{distance} km</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1 mt-4">Na miejscu</p>
              <p className="font-semibold">{arrivalTime}</p>
            </div>
            <div className="text-center">
              <p className="text-xs mb-1 mt-4">Czas</p>
              <p>{duration}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
