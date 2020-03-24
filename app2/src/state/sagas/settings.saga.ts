import { all, take, call } from "redux-saga/effects";
import i18n from "i18next";

import { setLang } from "src/state/settings";
import { default_language } from "src/app.config.json";

export function* onLangChangeSet_i18n() {
  while (true) {
    const { payload } = yield take(setLang.type);
    if (typeof payload === "string") yield call(i18n.changeLanguage, payload);
    else yield call(i18n.changeLanguage, default_language);
  }
}

export default function*() {
  yield all([onLangChangeSet_i18n()]);
}
