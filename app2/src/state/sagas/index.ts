import { all } from "redux-saga/effects";

import runSagas from "./storage.saga";
import settingsSagas from "./settings.saga";
import newsSagas from "./news.saga";
import authSagas from "./auth.saga";

export default function*() {
  yield all([runSagas(), settingsSagas(), newsSagas(), authSagas()]);
}
