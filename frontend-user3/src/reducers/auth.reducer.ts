import { AxiosResponse } from "axios";
import { isSuccess } from "src/tools/axiosInstance";
import { default_password } from "src/app.config.json";

const init: AuthState = {
  token: undefined,
  me: undefined
};

export default function(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload
      };
    case "SET_ME":
      return {
        ...state,
        me: action.payload
      };
    case "LOGOUT":
      return {
        ...init
      };
  }
}

export const setToken = (token: any) => (dispatch: any) =>
  dispatch({
    type: "SET_TOKEN",
    payload: token
  });

export const setMe = (me: any) => (dispatch: any) =>
  dispatch({
    type: "SET_ME",
    payload: me
  });

export const logout = () => (dispatch: any) =>
  dispatch({
    type: "LOGOUT"
  });

// ---------------  Selectors

export const getAccessToken = (state: any) =>
  !!state.auth.token ? state.auth.token.access_token : undefined;
export const getMe = (state: any) => state.auth.me;
export const isAuthenticated = (state: any) =>
  !!state.auth.token && !!state.auth.token.access_token;
export const isRegistered = (state: any) =>
  !!state.auth.me && !!state.auth.me.phone;

// ---------------  API calls

export const login = (username: string, password: string) => (
  dispatch: any,
  _: any,
  api: IAPI
) =>
  api.users.login(username, password).then((resp: AxiosResponse) => {
    if (isSuccess(resp)) {
      dispatch(setToken(resp.data.access_token));
      return dispatch(fetchMe());
    }
    return resp;
  });

export const register = () => (dispatch: any, _: any, api: IAPI) => {
  return api.users.register().then((resp: AxiosResponse) => {
    if (isSuccess(resp)) {
      const { username, password } = resp.data;
      return dispatch(login(username, password));
    }
    return resp;
  });
};

export const signup = (
  name: string | undefined,
  phone: string,
  email: string | undefined,
  password: string
) => (dispatch: any, getState: any, api: IAPI) => {
  const isAuth = isAuthenticated(getState());
  const hasMe = isRegistered(getState());
  if (!isAuth)
    return dispatch(register()).then((res1: AxiosResponse) => {
      if (!!res1)
        return dispatch(updateUser(name, phone, email)).then(
          (res2: AxiosResponse) => {
            if (!!res2)
              return dispatch(changePassword(default_password, password));
            return res2;
          }
        );
      return res1;
    });
  else if (!hasMe) {
    return dispatch(updateUser(name, phone, email)).then(
      (res1: AxiosResponse) => {
        if (!!res1) return dispatch(changePassword(default_password, password));
        return res1;
      }
    );
  }
};

export const updateUser = (
  name: string | undefined,
  phone: string | undefined,
  email: string | undefined
) => (dispatch: any, _: any, api: IAPI) => {
  const params: any = {};
  if (name !== undefined) params.name = name;
  if (phone !== undefined) params.phone = phone;
  if (email !== undefined) params.email = email;
  return api.users.update(params).then((resp: AxiosResponse) => {
    if (isSuccess(resp)) return dispatch(fetchMe());
    return resp;
  });
};

const changePassword = (oldPassword: string, newPassword: string) => (
  dispatch: any,
  getState: any,
  api: IAPI
) => {
  const me = getMe(getState());
  api.users
    .changePassword(oldPassword, newPassword)
    .then((resp: AxiosResponse) => {
      if (isSuccess(resp)) return dispatch(login(me.username, newPassword));
      return resp;
    });
};

export const fetchMe = () => (dispatch: any, _: any, api: IAPI) => {
  return api.users.fetchMe().then((resp: AxiosResponse) => {
    if (isSuccess(resp)) return dispatch(setMe(resp.data));
    return resp;
  });
};
