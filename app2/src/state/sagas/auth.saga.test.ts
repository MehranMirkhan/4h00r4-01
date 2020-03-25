import { all, call, put, take, select } from "redux-saga/effects";

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
import { watchRegister } from "./auth.saga";

describe("Auth saga", () => {
  describe("registering", () => {
    it("succeeds", () => {
      const gen = watchRegister();
      expect(gen.next().value).toEqual(take(registerReq.type));
    });
  });
});
