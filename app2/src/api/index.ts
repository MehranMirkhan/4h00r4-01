import Axios, { AxiosResponse } from "axios";

import config from "src/app.config.json";
import { store } from "src/state";

import users from "./users.api";
import questions from "./questions.api";
import hints from "./hints.api";
import misc from "./misc.api";
import { authTokenSelector, Token } from "src/state/auth";

const axiosInstance = Axios.create({
  baseURL: config.api_url,
  timeout: config.request_timeout,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});

// Logging
if (config.log && !!axiosInstance) {
  axiosInstance.interceptors.request.use(request => {
    console.log("Request:", request);
    return request;
  });
  axiosInstance.interceptors.response.use(response => {
    console.log("Response:", response);
    return response;
  });
}

if (!!axiosInstance) {
  axiosInstance.interceptors.request.use(request => {
    const token: Token | undefined = authTokenSelector(store.getState());
    if (!!token) request.headers.Authorization = `Bearer ${token.access_token}`;
    return request;
  });
}

export default {
  users: users(axiosInstance),
  questions: questions(axiosInstance),
  hints: hints(axiosInstance),
  misc: misc(axiosInstance)
};

export function isSuccess(resp: AxiosResponse): boolean {
  return !!resp && Math.floor(resp.status / 100) === 2;
}
