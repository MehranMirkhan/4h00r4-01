import { all } from "redux-saga/effects";

import { watchFetchNews } from "./misc.saga";

export default function*() {
  yield all([watchFetchNews()]);
}
