import { TimeType, Question } from "../../declarations";
import { Dispatch } from "redux";

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
  const data: Question[] = [
    { id: 1, text: "3 + 4 = ?" },
    { id: 2, text: "is 3301 prime?" },
  ];
  dispatch({
    type: QuestionListActions.SET,
    payload: data,
  });
}