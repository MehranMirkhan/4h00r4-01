import { all, take, call, select, put } from "redux-saga/effects";

import Storage from "src/tools/Storage";
import { StorageState, AppState } from "src/state";
import { persist_key } from "src/app.config.json";

import { setLang } from "src/state/settings";
import { storageLoaded } from "src/state/meta";
import { setAuth, fetchTokenSuccess, fetchMeSuccess, logoutSuccess } from "../auth";

export function convertStateToStorage(state: AppState): StorageState {
  return {
    settings: { lang: state.settings.lang },
    auth: { token: state.auth.token, me: state.auth.me }
  };
}

/**
 * If some states change (e.g. language), this change should be stored in storage.
 */
export function* watchStateChange() {
  while (true) {
    yield take([
      setLang.type,
      setAuth.type,
      fetchTokenSuccess.type,
      fetchMeSuccess,
      logoutSuccess.type,
    ]);
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
  const storage: StorageState | undefined = yield call(
    Storage.getObject,
    persist_key
  );
  // If nothing is stored, don't change state
  if (!!storage) {
    if (!!storage.settings) yield put(setLang(storage.settings.lang));
    if (!!storage.auth) yield put(setAuth(storage.auth));
  }
  yield put(storageLoaded());
}

export default function*() {
  yield all([watchStateChange(), loadStorageOnInit()]);
}
