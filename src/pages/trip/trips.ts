export interface Trip {
  id: string;
  type: "sport" | "cultural" | "nature";
  name: string;
  description: string;
  image: string; // URL lub ścieżka do obrazka
  distanceKm: number; // ilość km
  durationHours: number; // długość w godzinach (np. 1 = 1h)
  waypointsCount: number; // ilość punktów do odwiedzenia
}

export const TRIPS: Trip[] = [
  {
    id: "1",
    type: "cultural",
    name: "Bulwary Wiślane i Stare Miasto w Płocku",
    description:
      "Spokojna trasa wzdłuż Wisły z widokiem na skarpę i zabytkową bazylikę katedralną. Idealna na relaksujący przejazd i zwiedzanie centrum Płocka.",
    image:
      "https://modanamazowsze.pl/wp-content/uploads/2020/12/plock_tumskie-1170x680.jpg",
    distanceKm: 10.5,
    durationHours: 1.0,
    waypointsCount: 6,
  },
  {
    id: "2",
    type: "sport",
    name: "Płock – Brwilno – Maszewo Duże – Płock",
    description:
      "https://powiat-plock.pl/wp-content/uploads/2025/07/dji_0479.jpg",
    image: "https://powiat-plock.pl/wp-content/uploads/2025/07/dji_0479.jpg",
    distanceKm: 20.3,
    durationHours: 1.2,
    waypointsCount: 4,
  },
  {
    id: "3",
    type: "nature",
    name: "Rezerwat Brwilno i dolina Słupianki",
    description:
      "Malownicza trasa prowadząca przez lasy rezerwatu przyrody Brwilno i wzdłuż rzeki Słupianki. Idealna dla miłośników natury i spokoju — z dala od miejskiego zgiełku.",
    image: "https://kgs.info.pl/sites/default/files/2023-08/IMG_0053.jpg",
    distanceKm: 15.7,
    durationHours: 1.1,
    waypointsCount: 5,
  },
];
