import { useState } from "react";
import PRIVATE_BIKE_IMAGE from "@/assets/illustrations/private-bike.png";
import CITY_BIKE_IMAGE from "@/assets/illustrations/um-bike.png";
import ARROW_LEFT from "@/assets/icons/arrow-left.svg";
import { Button } from "antd";
import { Btn } from "../components/atoms/Button";
import { useNavigate } from "react-router";
import { PATHS } from "../router/paths";

export const SearchRoutePage = () => {
  const [bikeType, setBikeType] = useState<"city" | "private">("private");
  const navigate = useNavigate();

  return (
    <div className=" box h-dvh flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="">
          <Button
            type="text"
            size="small"
            icon={<img src={ARROW_LEFT} alt="Back" />}
          />
        </div>
        <p>OD: </p>
        <p>DO: </p>
        <div>
          <p className="font-medium mt-8">
            Z jakiego roweru będziesz korzystać?
          </p>
          <div className="flex gap-2 mt-2">
            <BikeButton
              imageSrc={PRIVATE_BIKE_IMAGE}
              label="Rower prywatny"
              selected={bikeType === "private"}
              onClick={() => setBikeType("private")}
            />
            <BikeButton
              imageSrc={CITY_BIKE_IMAGE}
              label="Rower miejski"
              selected={bikeType === "city"}
              onClick={() => setBikeType("city")}
            />
          </div>
        </div>
      </div>
      <Btn onClick={() => navigate(PATHS.MAP)}>Rozpocznij trasę</Btn>
    </div>
  );
};

const BikeButton = ({
  imageSrc,
  label,
  selected,
  onClick,
}: {
  imageSrc: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-4 border-4 rounded-3xl bg-[#F5F5F5] ${
        selected ? "border-purple-dark" : "border-gray-300"
      }`}
    >
      <img src={imageSrc} className="w-24 mb-2" />
      <p className="text-xs">{label}</p>
    </button>
  );
};
