import { Avatar } from "antd";
import DarkBlob from "@/assets/icons/blob.svg";
import Bike from "@/assets/icons/bike.png";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import AI from "@/assets/icons/ai.svg";
import { useNavigate } from "react-router";
import { PATHS } from "../router/paths";
import { LockOutlined } from "@ant-design/icons";
import VILLAGE from "@/assets/illustrations/village.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { useEffect, useState } from "react";
import {
  setAchievementAvailable,
  setAchievementNew,
} from "../redux/slices/achivementSlice";

export function HomePage() {
  const { distance, calories } = useAppSelector((state) => state.session);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAvailable, new: isNew } = useAppSelector(
    (state) => state.achievement
  );

  useEffect(() => {
    if (isNew) {
      const timeout = setTimeout(() => {
        dispatch(setAchievementNew(false));
        dispatch(setAchievementAvailable(true));
        navigate(PATHS.REWARD_PAGE); // 🔹 podaj tu adres docelowej podstrony
      }, 3000); // 3000 ms = 3 sekundy

      return () => clearTimeout(timeout);
    }
  }, [dispatch, isNew, navigate]);

  return (
    <>
      <div className="relative h-dvh z-30 bg-linear-to-b from-white to-[#D3CFF1] overflow-hidden">
        <div>
          <div>
            <img
              src={DarkBlob}
              className="-z-10 absolute top-20 -right-1/3   "
            />
            <img src={Bike} className="-z-10 absolute top-20 -right-1/4 w-80" />
          </div>
          <div className="box z-10">
            <div className="flex items-center gap-4">
              <Avatar
                onClick={() => setOpen(!open)}
                src="https://avatar.iran.liara.run/public/84"
                size="large"
              />
              <p className="font-medium">Witaj, Kasia</p>
            </div>
            <div className="mt-10">
              <p className="text-xs mb-1">Dzisiaj</p>
              <div className="text-4xl font-bold">
                <p>{Number(distance ?? 0).toFixed(2)} km</p>
                <p className="text-purple-dark">{Number(calories ?? 0).toFixed(2)} kcal</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 flex flex-col gap-2">
          <div className="box">
            <p className="text-xs mb-4">Osiągnięcia</p>
            <div className="flex gap-2">
              <Achievement locked={false} />
              <Achievement locked={isAvailable} />
              <Achievement locked={false} />
            </div>
          </div>
          <button
            onClick={() => navigate(PATHS.SEARCH_ROUTE)}
            className=" flex  rounded-3xl mx-4  text-start bg-purple-dark text-white text-lg font-medium"
          >
            <span className="p-4 pl-5 text-base">
              Rozpocznij nową trasę rowerową
            </span>
            <div className="bg-white w-fit rounded-xl h-fit p-1 m-4 ">
              <img src={ArrowUp} className="size-10 h-fit" />
            </div>
          </button>
          <button
            onClick={() => navigate(PATHS.TRIP_QUESTION)}
            className=" flex  rounded-3xl mx-4  text-start bg-white text-black text-lg font-medium"
          >
            <span className="p-4 pl-5 text-base">
              Wygenerujemy dopasowaną do ciebie trasę rowerową
            </span>
            <div className="bg-purple-dark w-fit rounded-xl  m-4 p-3 h-fit">
              <img src={AI} className="size-10 h-fit" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

const Achievement = ({ locked }: { locked: boolean }) => {
  return (
    <div className="rounded-full size-16 bg-white flex items-center justify-center">
      {locked ? (
        <img src={VILLAGE} className="size-9" />
      ) : (
        <LockOutlined style={{ color: "#ccc" }} />
      )}
    </div>
  );
};
