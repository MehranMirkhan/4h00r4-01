import { Dispatch } from "redux";

export enum QuestionActions {
  RESET = "Question/RESET",
  SET = "Question/SET",
  SET_ANSWER = "Question/SET_ANSWER",
  SET_HINT = "Question/SET_HINT",
  RESET_HINT = "Question/RESET_HINT",
}

const initialState = {
  entity: undefined,
  answerResult: undefined,
  hintResult: undefined,
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
    case QuestionActions.SET_HINT:
      return {
        ...state,
        hintResult: action.payload,
      };
    case QuestionActions.RESET_HINT:
      return {
        ...state,
        hintResult: undefined,
      };
    case QuestionActions.RESET:
      return initialState;
    default:
      return state;
  }
}

export const entitySelector = (state: any) => state.question.entity;
export const answerResultSelector = (state: any) => state.question.answerResult;
export const hintResultSelector = (state: any) => state.question.hintResult;

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

export const postAnswer = (id: number, answer: string) =>
  (dispatch: Dispatch, getState: any, API: any) => {
    return API.post(`/v1/answers`, { question_id: id, text: answer })
      .then((res: any) => {
        if (!!res && [200, 201].indexOf(res.status) >= 0) {
          dispatch({
            type: QuestionActions.SET_ANSWER,
            payload: res.data.correct,
          });
          return dispatch(fetch(entitySelector(getState()).id) as any);
        }
      });
  };

export const buyHint = (id: number) => (dispatch: Dispatch, getState: any, API: any) => {
  return API.post(`/v1/hints/${id}/buy`)
    .then((res: any) => {
      if (!!res && res.status === 200)
        dispatch({
          type: QuestionActions.SET_HINT,
          payload: res.data,
        });
        setTimeout(() => dispatch({
          type: QuestionActions.RESET_HINT,
        }), 1000);
        return dispatch(fetch(entitySelector(getState()).id) as any);
    });
};


function convert(data: any) {
  let q = { ...data };
  if (!!q.images) q.images = JSON.parse(data.images);
  if (!!q.choices) q.choices = JSON.parse(data.choices);
  if (!!q.letters) q.letters = JSON.parse(data.letters);
  return q;
}