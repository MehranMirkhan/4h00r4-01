
import { Question, TimeType, AnswerType, User } from './declarations';


export const me: User = {
  id: 1,
  name: "Mehran",
  email: "someone@somewhere.com",
  phone: "09121234567",
  level: 3,
};

export const questions: Question[] = [
  {
    id: 1,
    title: "is 3301 prime?",
    time_type: TimeType.DAILY,
    answer_type: AnswerType.CHOICE,
    start_time: new Date("2019-12-26T00:00:00Z"),
    end_time: new Date("2019-12-27T00:00:00Z"),
    images: [
      "/assets/shapes.svg",
      "/assets/shapes.svg",
      "/assets/shapes.svg",
    ],
    choices: [
      { type: "text", value: "Yes" },
      { type: "text", value: "No" },
    ],
    solutions: ["Yes"],
  },
  {
    id: 2,
    title: "The president of USA",
    time_type: TimeType.DAILY,
    answer_type: AnswerType.TEXT,
    start_time: new Date("2019-12-27T00:00:00Z"),
    end_time: new Date("2019-12-28T00:00:00Z"),
    images: [
      "/assets/shapes.svg",
      "/assets/shapes.svg",
      "/assets/shapes.svg",
    ],
    solutions: [
      "trump",
      "donald trump",
      "donald j trump",
      "donald j. trump",
    ]
  },
  {
    id: 3,
    title: "Capital of France",
    time_type: TimeType.WEEKLY,
    answer_type: AnswerType.LETTER,
    start_time: new Date("2019-12-25T00:00:00Z"),
    end_time: new Date("2020-01-07T00:00:00Z"),
    images: [
      "/assets/shapes.svg",
      "/assets/shapes.svg",
      "/assets/shapes.svg",
    ],
    letters: ["r", "i", "i", "s", "p", "e", "z", "a"],
    letters_num: 5,
    solutions: ["paris"]
  },
];

export const API = {
  getMe: () => me,
  getQuestions: (type: TimeType) => questions.filter(q => q.time_type === type),
  getQuestion: (id: number) => questions.find(q => q.id === id),
  postAnswer: (id: number, answer: string) => {
    const q = questions.find(q => q.id === id);
    if (!q || !q.solutions) return false;
    const s = q.solutions.filter(s => s === answer.toLowerCase());
    return !!s;
  }
};