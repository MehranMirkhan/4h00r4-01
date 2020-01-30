import Axios, { AxiosResponse } from "axios";

import config from "src/app.config.json";
import { store } from "src/providers/StateProvider";

const axiosInstance = Axios.create({
  baseURL: config.api_url,
  timeout: config.request_timeout,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use(request => {
  if (!request.headers.Authorization) {
    const state: any = store.getState();
    if (!!state.auth.token)
      request.headers.Authorization = `Bearer ${state.auth.token}`;
  }

  return request;
});

// Logging
if (config.log) {
  console.log("Axiso created");
  axiosInstance.interceptors.request.use(request => {
    console.log("Request:", request);
    return request;
  });
  axiosInstance.interceptors.response.use(response => {
    console.log("Response:", response);
    return response;
  });
}

export default axiosInstance;

export function isSuccess(resp: AxiosResponse): boolean {
  return !!resp && resp.status / 100 === 2;
}
