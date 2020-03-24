import Axios, { AxiosResponse } from "axios";

import config from "src/app.config.json";

import users from "./users.api";
import questions from "./questions.api";
import hints from "./hints.api";
import misc from "./misc.api";

const axiosInstance = Axios.create({
  baseURL: config.api_url,
  timeout: config.request_timeout,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});

// Logging
if (config.log) {
  axiosInstance.interceptors.request.use(request => {
    console.log("Request:", request);
    return request;
  });
  axiosInstance.interceptors.response.use(response => {
    console.log("Response:", response);
    return response;
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
