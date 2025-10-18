export interface Answer {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Jaki jest cel twojej wycieczki?",
    answers: [
      { id: 1, text: "Zwiedzanie zabytków" },
      { id: 2, text: "Przygoda i aktywności na świeżym powietrzu" },
      { id: 3, text: "Kultura i sztuka" },
      { id: 4, text: "Relaks i wypoczynek" },
      { id: 5, text: "Inne" },
    ],
  },
  {
    id: 2,
    question: "Ile czasu przewidujesz na tę wycieczkę?",
    answers: [
      { id: 1, text: "Do 1h" },
      { id: 2, text: "1-2h" },
      { id: 3, text: "2-5h" },
      { id: 4, text: "Cały dzień" },
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
    question: "Czy podróżować będziesz rowerem swoim czy miejskim?",
    answers: [
      { id: 1, text: "Rowerem miejskim" },
      { id: 2, text: "Rowerem swoim" },
    ],
  },
  {
    id: 5,
    question: "Gdzie chcesz rozpocząć swoją wycieczkę?",
    answers: [
      { id: 1, text: "W mojej aktualnej lokalizacji" },
      { id: 2, text: "Chcę wprowadzić inny punkt startowy" },
    ],
  },
  {
    id: 6,
    question: "Gdzie chcesz zakończyć swoją wycieczkę?",
    answers: [
      { id: 1, text: "W mojej aktualnej lokalizacji" },
      { id: 2, text: "Chcę wprowadzić inny punkt końcowy" },
    ],
  },
];
