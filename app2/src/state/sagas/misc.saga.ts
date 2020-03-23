import { call, put, take } from "redux-saga/effects";

import api from "src/api";
import {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFail
} from "src/state/news";

export function* fetchNews() {
  try {
    const resp = yield call(api.misc.getActiveNews);
    yield put(fetchNewsSuccess(resp.data));
  } catch (error) {
    yield put(fetchNewsFail(error));
  }
}

export function* watchFetchNews() {
  while (true) {
    yield take(fetchNewsRequest.type);
    yield call(fetchNews);
  }
}
