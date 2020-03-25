import { all, call, put, take, select } from "redux-saga/effects";

import api, { isSuccess } from "src/api";
import {
  registerReq,
  registerFail,
  signupReq,
  signupFail,
  loginReq,
  loginFail,
  refreshTokenReq,
  refreshTokenFail,
  fetchTokenSuccess,
  logoutReq,
  logoutSuccess,
  logoutFail,
  fetchMeReq,
  fetchMeSuccess,
  fetchMeFail,
  Token,
  authTokenSelector
} from "src/state/auth";

export function* registerSaga() {
  try {
    const resp = yield call(api.users.register);
    if (isSuccess(resp)) {
      const { username, password } = resp.data;
      yield call(loginSaga, username, password);
    } else throw resp;
  } catch (error) {
    yield put(registerFail(error));
  }
}

export function* signupSaga(user: Partial<User>) {
  const token: Token = yield select(authTokenSelector);
  if (!token) yield call(registerSaga);
  try {
    const resp = yield call(api.users.update, user);
    if (isSuccess(resp)) {
      yield call(fetchMeSaga);
    } else throw resp;
  } catch (error) {
    yield put(signupFail(error));
  }
}

export function* loginSaga(username: string, password: string) {
  try {
    const resp = yield call(api.users.login, username, password);
    if (isSuccess(resp)) {
      yield put(fetchTokenSuccess(resp.data));
      yield call(fetchMeSaga);
    } else throw resp;
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* refreshTokenSaga() {
  const { refresh_token }: Token = yield select(authTokenSelector);
  try {
    const resp = yield call(api.users.refresh, refresh_token);
    if (isSuccess(resp)) {
      yield put(fetchTokenSuccess(resp.data));
    } else throw resp;
  } catch (error) {
    yield put(refreshTokenFail(error));
  }
}

export function* logoutSaga() {
  // This should be fixed
  yield put(logoutSuccess());
}

export function* fetchMeSaga() {
  try {
    const resp = yield call(api.users.fetchMe);
    if (isSuccess(resp)) {
      yield put(fetchMeSuccess(resp.data));
    } else throw resp;
  } catch (error) {
    yield put(fetchMeFail(error));
  }
}

// ==============  WATCHERS  ==============

export function* watchRegister() {
  while (true) {
    yield take(registerReq.type);
    yield call(registerSaga);
  }
}

export function* watchSignup() {
  while (true) {
    const { payload } = yield take(signupReq.type);
    yield call(signupSaga, payload);
  }
}

export function* watchLogin() {
  while (true) {
    const { payload } = yield take(loginReq.type);
    yield call(loginSaga, payload.username, payload.password);
  }
}

export function* watchRefreshtoken() {
  while (true) {
    yield take(refreshTokenReq.type);
    yield call(refreshTokenSaga);
  }
}

export function* watchLogout() {
  while (true) {
    yield take(logoutReq.type);
    yield call(logoutSaga);
  }
}

export function* watchFetchMe() {
  while (true) {
    yield take(fetchMeReq.type);
    yield call(fetchMeSaga);
  }
}

export default function*() {
  yield all([
    watchRegister(),
    watchSignup(),
    watchLogin(),
    watchRefreshtoken(),
    watchLogout(),
    watchFetchMe()
  ]);
}
