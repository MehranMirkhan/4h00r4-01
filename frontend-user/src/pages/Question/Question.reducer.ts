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

export const fetch = (id: number) => (dispatch: Dispatch, _: any, API: any) => {
  return API.get(`/v1/questions/${id}`).then((res: any) => {
    if (!!res && res.status === 200) {
      let question = convert(res.data);
      dispatch({
        type: QuestionActions.SET,
        payload: question,
      });
    }
  });
};

export const postAnswer = (id: number, answer: string) => (dispatch: Dispatch) => {
  dispatch({
    type: QuestionActions.SET_ANSWER,
    payload: API.postAnswer(id, answer),
  });
};


function convert(data: any) {
  let q = {...data};
  if (!!q.images) q.images = JSON.parse(data.images);
  if (!!q.choices) q.choices = JSON.parse(data.choices);
  if (!!q.letters) q.letters = JSON.parse(data.letters);
  return q;
}