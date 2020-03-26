import { all, take, call, select } from "redux-saga/effects";
import i18n from "i18next";

import { setLang } from "src/state/settings";
import { default_language } from "src/app.config.json";
import { storageLoadedOninitSelector } from "../meta";

// This throws exception
// Don't use
export function* onLangChangeSet_i18n() {
  while (true) {
    const { payload } = yield take(setLang.type);
    if (typeof payload === "string") yield call(i18n.changeLanguage, payload);
    else yield call(i18n.changeLanguage, default_language);
  }
}

export function* onLangChangeReload() {
  while (true) {
    yield take(setLang.type);
    const storageLoadedOnInit: boolean = yield select(
      storageLoadedOninitSelector
    );
    if (storageLoadedOnInit)
      yield call(setTimeout, window.location.reload.bind(window.location), 500);
  }
}

export default function*() {
  yield all([onLangChangeReload()]);
}
