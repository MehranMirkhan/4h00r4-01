import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";

export type AuthState = {
  token?: Token;
  me?: Partial<User>;
  fetching: boolean;
  error: any;
};
export type Token = { access_token: string; refresh_token: string };
export type SignupRequest = {
  name?: string;
  phone: string;
  email?: string;
  password: string;
};
export type LoginRequest = { username: string; password: string };

export const initialState: AuthState = {
  token: undefined,
  me: undefined,
  fetching: false,
  error: undefined
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerReq(state: AuthState) {
      state.fetching = true;
    },
    registerFail(state: AuthState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.error = payload;
    },
    signupReq(state: AuthState, { payload }: PayloadAction<SignupRequest>) {
      state.fetching = true;
    },
    signupFail(state: AuthState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.error = payload;
    },
    signupSuccess(state: AuthState) {
      state.fetching = false;
    },
    loginReq(state: AuthState, { payload }: PayloadAction<LoginRequest>) {
      state.fetching = true;
    },
    loginFail(state: AuthState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.error = payload;
    },
    refreshTokenReq(state: AuthState) {
      state.fetching = true;
    },
    refreshTokenFail(state: AuthState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.error = payload;
    },
    fetchTokenSuccess(state: AuthState, { payload }: PayloadAction<Token>) {
      state.fetching = false;
      state.token = payload;
      state.error = undefined;
    },
    logoutReq(state: AuthState) {
      state.fetching = true;
    },
    logoutSuccess(state: AuthState) {
      state.fetching = false;
      state.token = undefined;
      state.error = undefined;
    },
    logoutFail(state: AuthState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.error = payload;
    },
    fetchMeReq(state: AuthState) {
      state.fetching = true;
    },
    fetchMeSuccess(
      state: AuthState,
      { payload }: PayloadAction<Partial<User>>
    ) {
      state.fetching = false;
      state.me = payload;
      state.error = undefined;
    },
    fetchMeFail(state: AuthState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.me = undefined;
      state.error = payload;
    }
  }
});

export default authSlice.reducer;
export const {
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
  fetchMeFail
} = authSlice.actions;
export const authTokenSelector = (state: AppState) => state.auth.token;
export const authMeSelector = (state: AppState) => state.auth.me;
export const authFetchingSelector = (state: AppState) => state.auth.fetching;
export const authErrorSelector = (state: AppState) => state.auth.error;
