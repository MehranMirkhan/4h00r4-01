import { AxiosResponse } from "axios";
import axiosInstance, { isSuccess } from "src/tools/axiosInstance";
import { default_password } from "src/app.config.json";
import { setCurrentLevel, setLevelHints } from "./level.reducer";

const init: AuthState = {
  token: undefined,
  me: undefined
};

export default function(
  state: AuthState = init,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "SET_TOKEN":
      if (!!action.payload)
        axiosInstance.defaults.headers.Authorization = `Bearer ${action.payload.access_token}`;
      else axiosInstance.defaults.headers.Authorization = undefined;
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
    case "RESET":
      axiosInstance.defaults.headers.Authorization = undefined;
      return {
        ...init
      };
    default:
      return state;
  }
}

export const setToken = (token: any) => ({
  type: "SET_TOKEN",
  payload: token
});

export const setMe = (me: any) => ({
  type: "SET_ME",
  payload: me
});

export const logout = () => ({
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
      window.history.back();
      dispatch(setToken(resp.data));
      return dispatch(fetchMe(true));
    }
    return resp;
  });

export const refresh = () => (dispatch: any, getState: any, api: IAPI) => {
  const { auth } = getState();
  if (!auth || !auth.token) return;
  api.users.refresh(auth.token.refresh_token).then((resp: AxiosResponse) => {
    if (isSuccess(resp)) return dispatch(setToken(resp.data));
    return resp;
  });
};

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
            if (!!res2) {
              window.history.back();
              return dispatch(changePassword(default_password, password));
            }
            return res2;
          }
        );
      return res1;
    });
  else if (!hasMe) {
    return dispatch(updateUser(name, phone, email)).then(
      (res1: AxiosResponse) => {
        window.history.back();
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

export const fetchMe = (fromLogin?: boolean) => (
  dispatch: any,
  _: any,
  api: IAPI
) => {
  return api.users.fetchMe().then((resp: AxiosResponse) => {
    if (isSuccess(resp)) {
      const user: Partial<User> = resp.data;
      dispatch(setMe(user));
      if (fromLogin) {
        dispatch(setCurrentLevel(user.level || 1));
        dispatch(setLevelHints(user.levelHints || []));
      }
    }
    return resp;
  });
};
