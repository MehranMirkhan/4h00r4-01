import { all, call, put, take } from "redux-saga/effects";

import api from "src/api";
import {
  fetchQuestionRequest,
  fetchQuestionSuccess,
  fetchQuestionFail
} from "src/state/question";

export function* fetchQuestion() {
  while (true) {
    const { payload } = yield take(fetchQuestionRequest.type);
    try {
      const resp = yield call(api.questions.getById, payload);
      yield put(fetchQuestionSuccess(resp.data));
    } catch (error) {
      yield put(fetchQuestionFail(error));
    }
  }
}

export default function*() {
  yield all([fetchQuestion()]);
}
