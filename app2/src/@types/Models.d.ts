type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  coin_1: number;
  coin_2: number;
  score_daily: number;
  score_weekly: number;
  level: number;
  levelHints: LevelHint[];
  profile_pic: string;
};

type Question = {
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
  letters_num: number[];
  solutions: string[];
  locale: Locale;
  hints: Hint[];
  solved?: boolean;
};

type Choice = {
  type: string;
  value: string;
};

type Answer = {
  user_id: number;
  question_id: number;
  text: string;
  correct: boolean;
};

type Hint = {
  id: number;
  question_id: number;
  type: HintType;
  value: string;
  price: number;
};

type Achievement = {
  code: string;
};

type LevelHint = {
  levelId: number;
  hintId: number;
};

type TimeType = "daily" | "weekly";

type AnswerType = "text" | "choice" | "letter";

type HintType = "image" | "choice" | "letter" | "try" | "time";
