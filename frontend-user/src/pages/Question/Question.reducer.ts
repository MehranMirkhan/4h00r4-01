import { Question } from "../../declarations";
import { Dispatch } from "redux";

export enum QuestionActions {
  RESET = "Question/RESET",
  SET = "Question/SET",
}

const initialState = {
  entity: undefined,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case QuestionActions.SET:
      return {
        ...state,
        data: action.payload,
      };
    case QuestionActions.RESET:
      return initialState;
    default:
      return state;
  }
}

export const entitySelector = (state: any) => state.question.entity;

export const reset = () => ({
  type: QuestionActions.RESET,
});

export const fetch = (id: number) => (dispatch: Dispatch) => {
  const entity: Question = { id: 2, text: "is 3301 prime?" };
  dispatch({
    type: QuestionActions.SET,
    payload: entity,
  });
}