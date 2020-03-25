import { all, call, put, take } from "redux-saga/effects";

import api from "src/api";
import {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFail
} from "src/state/news";

export function* fetchNews() {
  while (true) {
    yield take(fetchNewsRequest.type);
    try {
      const resp = yield call(api.misc.getActiveNews);
      yield put(fetchNewsSuccess(resp.data));
    } catch (error) {
      yield put(fetchNewsFail(error));
    }
  }
}

export default function*() {
  yield all([fetchNews()]);
}
