import { all } from "redux-saga/effects";

import settingsSagas from "./settings.saga";
import newsSagas from "./misc.saga";

export default function*() {
  yield all([settingsSagas(), newsSagas()]);
}
