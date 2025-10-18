import { TRIPS } from "./trips";
import { TripCard } from "../../components/molecules/TripCard";

export const TripListPage = () => {
  return (
    <div className="px-4 pt-15 h-dvh">
      <h2 className="font-semibold text-2xl">
        Oto wycieczki które dla ciebie znaleźśmy:
      </h2>
      <div className="flex flex-col gap-3 mt-8">
        {TRIPS.map((trip, index) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>
      <div className="mt-8">
        {/* <Button onClick={() => navigate("")}>Chcę rozpocząć wycieczkę</Button> */}
        <button className="mt- text-sm text-gray-400 underline rounded-full py-3 px-7 w-full">
          Chcę pojechać w wybrany przeze mnie punkt
        </button>
      </div>
    </div>
  );
};
