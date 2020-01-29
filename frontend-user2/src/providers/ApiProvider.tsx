import React, { useContext, createContext } from "react";
import { storageContext, initialState } from "./StorageProvider";
import Axios from "axios";

import API from "src/api";
import config from "src/app.config.json";

function createAxios(auth: AuthState) {
  const props: any = {
    baseURL: config.api_url,
    timeout: config.request_timeout,
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  };

  if (!!auth.token) props.headers.Authorization = `Bearer ${auth.token}`;

  const axios = Axios.create(props);

  if (config.log) {
    axios.interceptors.request.use(request => {
      console.log("Request:", request);
      return request;
    });
    axios.interceptors.response.use(response => {
      console.log("Response:", response);
      return response;
    });
  }

  return axios;
}

export function createDefaultAPI() {
  return API(createAxios(initialState.auth));
}

export const apiContext = createContext(createDefaultAPI());

const ApiProvider: React.FC = ({ children }) => {
  const { storageState } = useContext(storageContext);
  return (
    <apiContext.Provider value={API(createAxios(storageState.auth))}>
      {children}
    </apiContext.Provider>
  );
};

export default ApiProvider;
