import { all, call, put, take, select } from "redux-saga/effects";

import api from "src/api";
import {
  fetchWeeklyRequest,
  fetchWeeklySuccess,
  fetchWeeklyFail
} from "src/state/weekly";
import { langSelector } from "../settings";

export function* fetchWeekly() {
  const lang = yield select(langSelector);
  while (true) {
    yield take(fetchWeeklyRequest.type);
    try {
      const resp = yield call(api.questions.get, "weekly", lang);
      yield put(fetchWeeklySuccess(resp.data));
    } catch (error) {
      yield put(fetchWeeklyFail(error));
    }
  }
}

export default function*() {
  yield all([fetchWeekly()]);
}
