import { call, put, select } from "redux-saga/effects";

import api from "src/api";
import {
  registerFail,
  signupFail,
  signupSuccess,
  loginFail,
  refreshTokenFail,
  fetchTokenSuccess,
  logoutSuccess,
  logoutFail,
  fetchMeSuccess,
  fetchMeFail,
  authTokenSelector
} from "src/state/auth";
import {
  registerSaga,
  signupSaga,
  loginSaga,
  refreshTokenSaga,
  logoutSaga,
  fetchMeSaga,
  updateMeSaga
} from "./auth.saga";

describe("Auth saga", () => {
  const user: Partial<User> = {
    id: 1,
    name: "xx",
    phone: "1",
    coin_1: 10,
    coin_2: 0,
    level: 1,
    levelHints: []
  };
  const errorResp = {
    status: 400,
    data: "Bad request"
  };
  const registerResp = {
    status: 201,
    data: { username: "x", password: "y" }
  };
  const updateResp = {
    status: 200,
    data: user
  };
  const loginResp = {
    status: 200,
    data: { access_token: "a", refresh_token: "b" }
  };

  it("register", () => {});
});
