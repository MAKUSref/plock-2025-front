import { Button } from "../components/atoms/Button";
import IslandImage from "@/assets/icons/island.svg";
import TripIcon from "@/assets/icons/trip.png";
import DarkBlob from "@/assets/icons/blob-dark.svg";
import Bike from "@/assets/icons/bike.png";
import { useNavigate } from "react-router";
import { PATHS } from "../router/paths";

//TODO: CHECK PWA

export const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh w-full flex flex-col items-center justify-end bg-purple-dark">
      <div>
        <img
          src={DarkBlob}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 "
        />
        <img
          src={Bike}
          className="absolute top-20  left-1/2 transform -translate-x-1/2  w-92"
        />
      </div>
      <img src={IslandImage} className="z-10 w-1/2" />
      <div className="relative p-8 pt-14 bg-white text-center rounded-t-4xl">
        <img
          src={TripIcon}
          className="absolute z-20 w-16 -top-5 left-1/2 transform -translate-x-1/2"
        />
        <h1 className="text-2xl font-medium">Podróżuj rowerem po Płocku!</h1>
        <p className="text-xs text-gray-600 py-6">
          Chcesz pojeździć dla relaksu, czy wolisz poczuć sportową adrenalinę na
          trasie?
        </p>
        <Button
          onClick={() => {
            navigate(PATHS.TRIP_LIST);
          }}
        >
          Znajdź idealną trasę dla mnie!
        </Button>
        <button className="mt-2 text-sm text-gray-400 underline rounded-full py-3 px-7 w-full">
          Chcę tylko przejechać do punktu
        </button>
      </div>
    </div>
  );
};
