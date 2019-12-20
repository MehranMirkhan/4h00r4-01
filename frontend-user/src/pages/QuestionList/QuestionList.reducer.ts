import { TimeType } from "../../declarations";
import { Dispatch } from "redux";
import { API } from "../../data";

export enum QuestionListActions {
  RESET = "QuestionList/RESET",
  SET = "QuestionList/SET",
}

const initialState = {
  data: []
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case QuestionListActions.SET:
      return {
        ...state,
        data: action.payload,
      };
    case QuestionListActions.RESET:
      return initialState;
    default:
      return state;
  }
}

export const dataSelector = (state: any) => state.question_list.data;

export const reset = () => ({
  type: QuestionListActions.RESET,
});

export const fetch = (type: TimeType) => (dispatch: Dispatch) => {
  dispatch({
    type: QuestionListActions.SET,
    payload: API.getQuestions(type),
  });
}