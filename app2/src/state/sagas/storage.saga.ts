import { all, take, call, select, put } from "redux-saga/effects";

import Storage from "src/tools/Storage";
import { StorageState, AppState } from "src/state";
import { persist_key } from "src/app.config.json";

import { setLang } from "src/state/settings";
import { storageLoaded } from "src/state/meta";

export function convertStateToStorage(state: AppState): StorageState {
  return {
    settings: { lang: state.settings.lang }
  };
}

/**
 * If some states change (e.g. language), this change should be stored in storage.
 */
export function* watchStateChange() {
  while (true) {
    yield take([setLang.type]);
    const state: AppState = yield select();
    if (state.meta.storageLoadedOnInit) {
      const storage: StorageState = convertStateToStorage(state);
      yield call(Storage.setObject, persist_key, storage);
    }
  }
}

/**
 * Previously stored data should be available when app starts.
 */
export function* loadStorageOnInit() {
  const storage: StorageState | undefined = yield call(Storage.getObject, persist_key);
  // If nothing is stored, don't change state
  if (!!storage) {
    // If language is stored, load it
    if (!!storage.settings) yield put(setLang(storage.settings.lang));
  }
  yield put(storageLoaded());
}

export default function*() {
  yield all([watchStateChange(), loadStorageOnInit()]);
}
