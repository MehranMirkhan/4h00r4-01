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
  fetchMeSaga
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

  describe("register", () => {
    it("succeeds", () => {
      const gen = registerSaga();
      expect(gen.next().value).toEqual(call(api.users.register));
      expect(gen.next(registerResp).value).toEqual(call(loginSaga, "x", "y"));
    });
    it("fails without response", () => {
      const gen = registerSaga();
      expect(gen.next().value).toEqual(call(api.users.register));
      expect(gen.throw("Network Error").value).toEqual(
        put(registerFail("Network Error"))
      );
    });
    it("fails with response", () => {
      const gen = registerSaga();
      expect(gen.next().value).toEqual(call(api.users.register));
      expect(gen.next(errorResp).value).toEqual(put(registerFail(errorResp)));
    });
  });

  describe("signup", () => {
    it("succeeds without register", () => {
      const gen = signupSaga(user);
      gen.next(); // Get state
      expect(gen.next(loginResp.data).value).toEqual(
        call(api.users.update, user)
      );
      expect(gen.next(updateResp as any).value).toEqual(put(signupSuccess()));
      expect(gen.next().value).toEqual(call(fetchMeSaga));
    });
    it("succeeds with register", () => {
      const gen = signupSaga(user);
      gen.next(); // Get state
      expect(gen.next(undefined as any).value).toEqual(call(registerSaga));
      expect(gen.next(loginResp.data).value).toEqual(
        call(api.users.update, user)
      );
      expect(gen.next(updateResp as any).value).toEqual(put(signupSuccess()));
      expect(gen.next().value).toEqual(call(fetchMeSaga));
    });
    it("fails at update", () => {
      const gen = signupSaga(user);
      gen.next(); // get state
      gen.next(loginResp.data).value;
      expect(gen.next(errorResp as any).value).toEqual(
        put(signupFail(errorResp))
      );
    });
    it("fails at register", () => {
      const gen = signupSaga(user);
      gen.next(); // get state
      gen.next(undefined as any).value;
      expect(gen.throw("Error").value).toEqual(put(signupFail("Error")));
    });
  });

  describe("login", () => {
    it("succeeds", () => {
      const gen = loginSaga("x", "y");
      expect(gen.next().value).toEqual(call(api.users.login, "x", "y"));
      expect(gen.next(loginResp).value).toEqual(
        put(fetchTokenSuccess(loginResp.data))
      );
    });
    it("fails without response", () => {
      const gen = loginSaga("x", "y");
      expect(gen.next().value).toEqual(call(api.users.login, "x", "y"));
      expect(gen.throw("Network Error").value).toEqual(
        put(loginFail("Network Error"))
      );
    });
    it("fails with response", () => {
      const gen = loginSaga("x", "y");
      expect(gen.next().value).toEqual(call(api.users.login, "x", "y"));
      expect(gen.next(errorResp).value).toEqual(put(loginFail(errorResp)));
    });
  });

  describe("refreshToken", () => {
    it("succeeds", () => {
      const gen = refreshTokenSaga();
      gen.next(); // get state
      expect(gen.next(loginResp.data).value).toEqual(
        call(api.users.refresh, loginResp.data.refresh_token)
      );
      expect(gen.next(loginResp as any).value).toEqual(
        put(fetchTokenSuccess(loginResp.data))
      );
    });
    it("fails without response", () => {
      const gen = refreshTokenSaga();
      gen.next(); // get state
      expect(gen.next(loginResp.data).value).toEqual(
        call(api.users.refresh, loginResp.data.refresh_token)
      );
      expect(gen.throw("Network Error").value).toEqual(
        put(refreshTokenFail("Network Error"))
      );
    });
    it("fails with response", () => {
      const gen = refreshTokenSaga();
      gen.next(); // get state
      expect(gen.next(loginResp.data).value).toEqual(
        call(api.users.refresh, loginResp.data.refresh_token)
      );
      expect(gen.next(errorResp as any).value).toEqual(
        put(refreshTokenFail(errorResp))
      );
    });
  });

  describe("logout", () => {
    it("succeeds", () => {
      const gen = logoutSaga();
      expect(gen.next().value).toEqual(put(logoutSuccess()));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe("fetchMe", () => {
    it("succeeds", () => {
      const gen = fetchMeSaga();
      expect(gen.next().value).toEqual(select(authTokenSelector));
      expect(gen.next(loginResp.data).value).toEqual(call(api.users.fetchMe));
      expect(gen.next(updateResp as any).value).toEqual(
        put(fetchMeSuccess(user))
      );
    });
    it("fails at token", () => {
      const gen = fetchMeSaga();
      expect(gen.next().value).toEqual(select(authTokenSelector));
      expect(gen.next(undefined as any).value).toEqual(
        put(fetchMeFail("Please signup first"))
      );
    });
    it("fails at fetchMeRequest", () => {
      const gen = fetchMeSaga();
      expect(gen.next().value).toEqual(select(authTokenSelector));
      expect(gen.next(loginResp.data).value).toEqual(call(api.users.fetchMe));
      expect(gen.next(errorResp as any).value).toEqual(
        put(fetchMeFail(errorResp))
      );
    });
  });
});
