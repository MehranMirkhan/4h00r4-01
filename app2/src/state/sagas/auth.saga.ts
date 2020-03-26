import { all, call, put, take, select } from "redux-saga/effects";

import api, { isSuccess } from "src/api";
import config from "src/app.config.json";
import {
  registerReq,
  registerFail,
  signupReq,
  signupFail,
  signupSuccess,
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
  updateMeReq,
  updateMeSuccess,
  updateMeFail,
  passwordChangeReq,
  passwordChangeSuccess,
  passwordChangeFail,
  Token,
  authTokenSelector,
  hasTokenSelector,
  PasswordChangeRequest,
  hasMeSelector,
  SignupRequest,
  LoginRequest
} from "src/state/auth";

export function* registerSaga() {
  const hasToken: boolean = yield select(hasTokenSelector);
  if (hasToken) yield call(logoutSaga);
  try {
    const resp = yield call(api.users.register);
    if (isSuccess(resp)) {
      const { username, password } = resp.data;
      yield call(loginSaga, { username, password });
    } else throw resp;
  } catch (error) {
    yield put(registerFail(error));
  }
}

export function* signupSaga(signupRequest: SignupRequest) {
  const hasToken: boolean = yield select(hasTokenSelector);
  const hasMe: boolean = yield select(hasMeSelector);
  try {
    if (hasMe) yield call(logoutSaga);
    if (!hasToken) yield call(registerSaga);
    yield call(updateMeSaga, signupRequest);
    yield call(passwordChangeSaga, {
      oldPassword: config.default_password,
      newPassword: signupRequest.password
    });
  } catch (error) {
    yield put(signupFail(error));
  }
}

export function* loginSaga(loginRequest: LoginRequest) {
  try {
    const resp = yield call(
      api.users.login,
      loginRequest.username,
      loginRequest.password
    );
    if (isSuccess(resp)) {
      yield put(fetchTokenSuccess(resp.data));
      yield call(fetchMeSaga);
    } else throw resp;
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* refreshTokenSaga() {
  const hasToken: boolean = yield select(hasTokenSelector);
  if (!hasToken) return;
  try {
    const { refresh_token }: Token = yield select(authTokenSelector);
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
  const hasToken: boolean = yield select(hasTokenSelector);
  try {
    if (!hasToken) throw "Please signup first";
    const resp = yield call(api.users.fetchMe);
    if (isSuccess(resp)) {
      yield put(fetchMeSuccess(resp.data));
    } else throw resp;
  } catch (error) {
    yield put(fetchMeFail(error));
  }
}

export function* updateMeSaga(user: Partial<User>) {
  const hasToken: boolean = yield select(hasTokenSelector);
  try {
    if (!hasToken) throw "Please signup first";
    console.log(`[updateMeSaga] user = ${JSON.stringify(user)}`);
    const resp = yield call(api.users.update, user);
    if (isSuccess(resp)) {
      yield put(updateMeSuccess());
      yield call(fetchMeSaga);
    } else throw resp;
  } catch (error) {
    yield put(updateMeFail(error));
  }
}

export function* passwordChangeSaga({
  oldPassword,
  newPassword
}: PasswordChangeRequest) {
  const hasToken: boolean = yield select(hasTokenSelector);
  try {
    if (!hasToken) throw "Please signup first";
    const resp = yield call(api.users.changePassword, oldPassword, newPassword);
    if (isSuccess(resp)) {
      yield put(passwordChangeSuccess());
    } else throw resp;
  } catch (error) {
    yield put(passwordChangeFail(error));
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
    yield call(loginSaga, payload);
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

export function* watchUpdateMe() {
  while (true) {
    const { payload } = yield take(updateMeReq.type);
    yield call(updateMeSaga, payload);
  }
}

export function* watchPasswordChange() {
  while (true) {
    const { payload } = yield take(passwordChangeReq.type);
    yield call(passwordChangeSaga, payload);
  }
}

export default function*() {
  yield all([
    watchRegister(),
    watchSignup(),
    watchLogin(),
    watchRefreshtoken(),
    watchLogout(),
    watchFetchMe(),
    watchUpdateMe(),
    watchPasswordChange()
  ]);
}
