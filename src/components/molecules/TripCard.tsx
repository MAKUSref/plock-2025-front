import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { Trip } from "../../pages/trip/trips";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { PATHS } from "../../router/paths";

export const TripCard = ({ trip }: { trip: Trip }) => {
  const navigate = useNavigate();

  return (
    <div
      className="mb-3"
      onClick={() => navigate(PATHS.TRIP_PAGE.replace(":tripId", trip.id))}
    >
      <img src={trip.image} className="object-cover h-30 w-full rounded-2xl" />
      <div className="mt-2">
        <h3 className="text-sm font-medium">{trip.name}</h3>
        <div className="flex gap-3 text-xs">
          <Element label="" text={`${trip.distanceKm} km`} />
          <Element
            icon={<ClockCircleOutlined />}
            text={`${trip.durationHours} h`}
          />
          <Element
            icon={<EnvironmentOutlined />}
            text={`${trip.waypointsCount}`}
          />
        </div>
      </div>
    </div>
  );
};

const Element = ({
  icon,
  text,
  label,
}: {
  icon?: ReactNode;
  text: string;
  label?: string;
}) => {
  return (
    <div className="flex items-center gap-1">
      {label ?? icon}
      <span>
        {label}
        {text}
      </span>
    </div>
  );
};
