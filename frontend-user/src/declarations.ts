export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

export interface User {
  id: number,
  name?: string,
  email?: string,
  phone?: string,
  level?: number,
}

export interface Question {
  id: number,
  text?: string,
  time_type?: TimeType,
  answer_type?: AnswerType,
  start_time?: Date,
  end_time?: Date,
  letters?: string,
  score?: number,
  tries?: number,
  images?: string[],
}

export enum TimeType { DAILY = 0, WEEKLY = 1 }
export enum AnswerType { CHOICE = 0, TEXT = 1, LETTER = 2 }

export interface Solution {
  question_id: number,
  text: string,
}

export interface Answer {
  user_id: number,
  question_id: number,
  text: string,
}
