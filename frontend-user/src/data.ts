
import { Question, TimeType, AnswerType, Solution } from './declarations';

export const questions: Question[] = [
  {
    id: 1,
    text: "is 3301 prime?",
    time_type: TimeType.DAILY,
    answer_type: AnswerType.CHOICE,
    start_time: new Date("2019-12-20T00:00:00Z"),
    end_time: new Date("2019-12-21T00:00:00Z"),
    images: [
      "/assets/shapes.svg",
      "/assets/shapes.svg",
      "/assets/shapes.svg",
    ],
    choices: ["Yes", "No"],
  },
  {
    id: 2,
    text: "The president of USA",
    time_type: TimeType.DAILY,
    answer_type: AnswerType.TEXT,
    start_time: new Date("2019-12-21T00:00:00Z"),
    end_time: new Date("2019-12-22T00:00:00Z"),
    images: [
      "/assets/shapes.svg",
      "/assets/shapes.svg",
      "/assets/shapes.svg",
    ],
  },
  {
    id: 3,
    text: "Capital of France",
    time_type: TimeType.WEEKLY,
    answer_type: AnswerType.LETTER,
    start_time: new Date("2019-12-19T00:00:00Z"),
    end_time: new Date("2019-12-26T00:00:00Z"),
    images: [
      "/assets/shapes.svg",
      "/assets/shapes.svg",
      "/assets/shapes.svg",
    ],
    letters: ["r", "i", "i", "s", "p", "e", "z", "a"],
  },
];

export const solutions: Solution[] = [
  { question_id: 1, text: "yes" },
  { question_id: 2, text: "trump" },
  { question_id: 2, text: "donald trump" },
  { question_id: 2, text: "donald j trump" },
  { question_id: 2, text: "donald j. trump" },
  { question_id: 3, text: "paris" },
];

export const API = {
  getQuestions: (type: TimeType) => questions.filter(q => q.time_type === type),
  getQuestion: (id: number) => questions.find(q => q.id === id),
  postAnswer: (id: number, answer: string) =>
    !!solutions.filter(s => s.question_id === id).find(s => s.text === answer),
};