import { useNavigate } from "react-router";
import { PATHS } from "../router/paths";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

import VILLAGE from "@/assets/illustrations/village.png";
import { Btn } from "../components/atoms/Button";

export const RewardPage = () => {
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRun(true);
    }, 500); // 1000 ms = 1 sekunda

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="h-dvh flex justify-center items-center bg-purple-dark">
      {run && (
        <Confetti
          className="z-50"
          style={{ zIndex: 9999, pointerEvents: "none", position: "fixed" }}
          width={width}
          height={height}
          recycle={false}
        />
      )}
      <div className="bg-white m-8 p-4 rounded-3xl text-center flex flex-col items-center ">
        <div className="rounded-full size-32 bg-white flex items-center justify-center">
          <img src={VILLAGE} className="size-16" />
        </div>
        <h3 className="font-medium">Pierwsza Przejażdżka!</h3>
        <p className="text-sm text-gray-500 pb-8 pt-3">
          Gratulacje! Ukończyłaś swoją pierwszą trasę rowerem miejskim.
        </p>
        <Btn
          onClick={() => {
            navigate(PATHS.START);
          }}
        >
          Odbierz
        </Btn>
      </div>
    </div>
  );
};
