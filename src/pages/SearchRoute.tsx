import { useState, type MouseEventHandler } from "react";
import PRIVATE_BIKE_IMAGE from "@/assets/illustrations/private-bike.png";
import CITY_BIKE_IMAGE from "@/assets/illustrations/um-bike.png";
import { Btn } from "../components/atoms/Button";
import { useLocation } from "../hooks/useLocation";
import { AimOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { AddressAutofill, useConfirmAddress } from "@mapbox/search-js-react";
import clsx from "clsx";
import { config } from "../config/config";
import { useLazySearchLocationQuery } from "../api/searchApi/searchApi";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentBikeType, setSearchResult } from "../redux/map/mapSlice";
import { setCurrentLocation } from "../redux/location/locationSlice";
import { useNavigate } from "react-router";
import { PATHS } from "../router/paths";
import { BackBtn } from "../components/atoms/BackBtn";
import { Input } from "antd";

export const SearchRoutePage = () => {
  const [destination, setDestination] = useState("");
  const { location, refresh } = useLocation();
  const [bikeType, setBikeType] = useState<"city" | "private">("private");
  const { formRef } = useConfirmAddress();
  const [triggerSearchLocation] = useLazySearchLocationQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    triggerSearchLocation({
      query: destination,
      proximity: { latitude: location.lat ?? 0, longitude: location.lon ?? 0 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((result: any) => {
      console.log(result.data.features);
      if (!result?.data?.features) return;
      if (!location.lon || !location.lat) return;

      dispatch(
        setSearchResult({
          location: [
            result.data.features[0].properties.coordinates.longitude,
            result.data.features[0].properties.coordinates.latitude,
          ],
          name:
            result.data?.features[0].properties.context.place.name +
            " " +
            result.data?.features[0].properties.context.street.name,
        })
      );

      dispatch(setCurrentLocation([location.lon, location.lat]));

      dispatch(setCurrentBikeType(bikeType));
      navigate(PATHS.MAP);
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="box h-dvh flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <BackBtn />
          <Input
            value="Twoja lokalizacja"
            size="large"
            readOnly
            prefix={
              <AimOutlined
                className={clsx("text-xl mr-2", location && "!text-purple-600")}
                onClick={refresh}
                style={{ cursor: "pointer" }}
              />
            }
          />
          <AddressAutofill accessToken={config.MAPBOX_ACCESS_TOKEN}>
            <Input
              placeholder="Wyszukaj dokąd chcesz jechać"
              size="large"
              autoComplete="address"
              onChange={(e) => setDestination(e.target.value)}
              prefix={<EnvironmentOutlined className="text-xl mr-2" />}
            />
          </AddressAutofill>
          <div>
            <p className="font-medium mt-8">
              Z jakiego roweru będziesz korzystać?
            </p>
            <div className="flex gap-2 mt-2">
              <BikeButton
                imageSrc={PRIVATE_BIKE_IMAGE}
                label="Rower prywatny"
                selected={bikeType === "private"}
                onClick={(e) => {
                  e.preventDefault();
                  setBikeType("private");
                }}
              />
              <BikeButton
                imageSrc={CITY_BIKE_IMAGE}
                label="Rower miejski"
                selected={bikeType === "city"}
                onClick={(e) => {
                  e.preventDefault();
                  setBikeType("city");
                }}
              />
            </div>
          </div>
        </div>
        <Btn>Rozpocznij trasę</Btn>
      </div>
    </form>
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
  onClick: MouseEventHandler<HTMLButtonElement>;
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
