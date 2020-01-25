export type AppPage = {
  url: string;
  icon: object;
  title: string;
};

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  coin_1: number;
  coin_2: number;
  score_daily: number;
  score_weekly: number;
  level: number;
  profile_pic: string;
};

export type Question = {
  id: number;
  title: string;
  images: string[];
  start_time: Date;
  end_time: Date;
  score: number;
  tries: number;
  time_type: TimeType;
  answer_type: AnswerType;
  choices: Choice[];
  letters: string[];
  letters_num: number;
  solutions: string[];
  locale: Locale;
  hints: Hint[];
  solved?: boolean;
};

export type Choice = {
  type: string;
  value: string;
};

export type Answer = {
  user_id: number;
  question_id: number;
  text: string;
  correct: boolean;
};

export type Hint = {
  id: number;
  question_id: number;
  type: HintType;
  value: string;
  price: number;
};

export type Achievement = {
  code: string;
};

export type LevelHint = {
  levelId: number;
  hintId: number;
};

export enum TimeType {
  DAILY = "daily",
  WEEKLY = "weekly"
}
export enum AnswerType {
  TEXT = "text",
  CHOICE = "choice",
  LETTER = "letter"
}
export enum Locale {
  EN = "en",
  FA = "fa"
}
export enum HintType {
  IMAGE = "image",
  CHOICE = "choice",
  LETTER = "letter",
  TRY = "try",
  TIME = "time"
}
