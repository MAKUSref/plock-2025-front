import { useParams } from "react-router";
import { TRIPS } from "./trips";

export const TripPage = () => {
  const { tripId } = useParams<{ tripId: string }>();

  const trip = TRIPS.find((t) => t.id === tripId);

  if (!trip) {
    return <div>Trip not found</div>;
  }

  return (
    <div>
      <img src={trip.image} className="object-cover h-40 w-full rounded-2xl" />
      <div className="box">
        <h3 className="font-semibold  ">{trip.name}</h3>
        <p className="text-sm text-gray-600 mt-2">{trip.description}</p>
      </div>
    </div>
  );
};
