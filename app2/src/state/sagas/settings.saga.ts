import { all, take, call, select } from "redux-saga/effects";

import { setLang } from "src/state/settings";
import { storageLoadedOninitSelector } from "../meta";

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
