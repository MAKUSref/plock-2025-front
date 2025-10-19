import { Avatar } from "antd";
import DarkBlob from "@/assets/icons/blob.svg";
import Bike from "@/assets/icons/bike.png";
import ArrowUp from "@/assets/icons/arrow-up.svg";
import TreeImage from "@/assets/illustrations/tree.png";
import { useNavigate } from "react-router";
import { PATHS } from "../router/paths";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh">
      <div>
        <div>
          <img src={DarkBlob} className="-z-10 absolute top-20 -right-1/3   " />
          <img src={Bike} className="-z-10 absolute top-20 -right-1/3 w-80" />
        </div>
        <div className="box">
          <div className="flex items-center gap-4">
            <Avatar
              src="https://avatar.iran.liara.run/public/84"
              size="large"
            />
            <p className="font-medium">Witaj, Kasia</p>
          </div>
          <div className="mt-5">
            <p className="text-xs mb-1">Dzisiaj</p>
            <div className="text-4xl font-bold">
              <p>20 km</p>
              <p className="text-purple-dark">200 kcal</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs mb-1">Ten tydzień</p>
            <div className="text-xl font-semibold">
              <p>87 km</p>
              {/* <p className="text-purple-dark">200 kcal</p> */}
            </div>
          </div>
          <div className="mt-16">
            <p className="text-xs mb-4">Osiągnięcia</p>
            <div className="flex gap-2">
              <div className="rounded-full size-16 bg-red-400"></div>
              <div className="rounded-full size-16 bg-red-400"></div>
              <div className="rounded-full size-16 bg-red-400"></div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-xs mb-1">Drzewka które zasadziłeś: </p>
            <img src={TreeImage} className="w-16" />
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(PATHS.SEARCH_ROUTE)}
        className="absolute flex bottom-5 rounded-3xl mx-4  text-start bg-purple-dark text-white text-lg font-medium"
      >
        <span className="p-4 pl-5 text-base">
          Rozpocznij nową trasę rowerową
        </span>
        <div className="bg-white w-fit rounded-xl h-full m-4 ">
          <img src={ArrowUp} className="p-2" />
        </div>
      </button>
    </div>
  );
}
