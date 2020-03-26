import { all, call, put, take, select } from "redux-saga/effects";

import api from "src/api";
import {
  fetchDailyRequest,
  fetchDailySuccess,
  fetchDailyFail
} from "src/state/daily";
import { langSelector } from "../settings";

export function* fetchDaily() {
  const lang = yield select(langSelector);
  while (true) {
    yield take(fetchDailyRequest.type);
    try {
      const resp = yield call(api.questions.get, "daily", lang);
      yield put(fetchDailySuccess(resp.data));
    } catch (error) {
      yield put(fetchDailyFail(error));
    }
  }
}

export default function*() {
  yield all([fetchDaily()]);
}
