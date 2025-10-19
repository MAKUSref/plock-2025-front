export interface Data { 
  time?: number,
  type?: "sport" | "cultural" | "nature",
  tags?: string[]
}

export interface Answer {
  id: number;
  text: string;
  value?: Data}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Co lubisz robić w czasie wolnym?",
    answers: [
      { id: 1, text: "Zwiedzanie zabytków", value:{ tags: ["museum", "historical_site", "church"] } },
      { id: 2, text: "Przygoda i aktywności na świeżym powietrzu", value: { tags: ["park", "entertainment"] } },
      { id: 3, text: "Kultura i sztuka", value: { tags: ["museum", "historical_site"] } },
      { id: 4, text: "Relaks i wypoczynek", value: { tags: ["entertainment", "park", "restaurant"] } },
      { id: 5, text: "Inne", value: { tags: ["museum", "historical_site", "park", "entertainment", "restaurant"] } },
    ],
  },
  {
    id: 2,
    question: "Ile czasu przewidujesz na tę wycieczkę?",
    answers: [
      { id: 1, text: "Do 1h", value: { time: 1 } },
      { id: 2, text: "1-2h", value: { time: 2 } },
      { id: 3, text: "2-5h", value: { time: 5 } },
      { id: 4, text: "Cały dzień", value: { time: 12 } },
    ],
  },
    {
    id: 3,
    question: "Jakie krajobrazy cię interesują?",
    answers: [
      { id: 1, text: "Miasto" },
      { id: 2, text: "Przedmieścia" },
      { id: 3, text: "Natura" },
    ],
  },
  {
    id: 4,
    question: "Jaki ma być motyw przewodni tej wycieczki?",
    answers: [
      { id: 1, text: "Sport", value: { type: "sport" } },
      { id: 2, text: "Kultura", value: { type: "cultural" } },
      { id: 3, text: "Natura", value: { type: "nature" } },
    ],
  },
  {
    id: 5,
    question: "Czy podróżować będziesz rowerem swoim czy miejskim?",
    answers: [
      { id: 1, text: "Rowerem miejskim" },
      { id: 2, text: "Rowerem swoim" },
    ],
  },
  {
    id: 6,
    question: "Gdzie chcesz rozpocząć swoją wycieczkę?",
    answers: [
      { id: 1, text: "W mojej aktualnej lokalizacji" },
      { id: 2, text: "Chcę wprowadzić inny punkt startowy" },
    ],
  },
];
