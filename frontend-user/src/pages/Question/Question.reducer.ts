import { Dispatch } from "redux";
import { API } from "../../data";

export enum QuestionActions {
  RESET = "Question/RESET",
  SET = "Question/SET",
  SET_ANSWER = "Question/SET_ANSWER",
}

const initialState = {
  entity: undefined,
  answerResult: undefined,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case QuestionActions.SET:
      return {
        ...state,
        entity: action.payload,
      };
    case QuestionActions.SET_ANSWER:
      return {
        ...state,
        answerResult: action.payload,
      };
    case QuestionActions.RESET:
      return initialState;
    default:
      return state;
  }
}

export const entitySelector = (state: any) => state.question.entity;
export const answerResultSelector = (state: any) => state.question.answerResult;

export const reset = () => ({
  type: QuestionActions.RESET,
});

export const fetch = (id: number) => (dispatch: Dispatch) => {
  dispatch({
    type: QuestionActions.SET,
    payload: API.getQuestion(id),
  });
};

export const answer = (id: number, answer: string) => (dispatch: Dispatch) => {
  dispatch({
    type: QuestionActions.SET_ANSWER,
    payload: API.postAnswer(id, answer),
  });
};