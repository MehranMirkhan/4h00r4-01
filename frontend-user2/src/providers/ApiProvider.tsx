import React, { useContext, createContext, useMemo } from "react";
import Axios from "axios";

import API from "src/api";
import config from "src/app.config.json";

import { storageContext, initialContext } from "./StorageProvider";
import { alertContext } from "./AlertProvider";
import { register } from "src/services/users.service";

function createAxios(storage: IStorageContext, showMessage: ShowMessage) {
  const { auth } = storage.storageState;
  // Making props
  const props: any = {
    baseURL: config.api_url,
    timeout: config.request_timeout,
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  };
  if (!!auth.token) props.headers.Authorization = `Bearer ${auth.token}`;

  const axios = Axios.create(props);

  // Loging
  if (config.log) {
    console.log("Creating axios");
    axios.interceptors.request.use(request => {
      console.log("Request:", request);
      return request;
    });
    axios.interceptors.response.use(response => {
      console.log("Response:", response);
      return response;
    });
  }

  // Exception handling
  axios.interceptors.response.use(
    res => res,
    error => {
      if (error.code === "ECONNABORTED" || error.message === "Network Error") {
        if (!!showMessage) showMessage("Error", "Network Error", 2000);
      } else if (error.response.status === 401) {
        if (!!auth && !auth.token) register(storage, API(axios), showMessage)();
      }
    }
  );

  return axios;
}

export function createDefaultAPI() {
  return API(createAxios(initialContext, () => {}));
}

export const apiContext = createContext(createDefaultAPI());

const ApiProvider: React.FC = ({ children }) => {
  const storage = useContext(storageContext);
  const showMessage = useContext(alertContext);
  const api = useMemo(() => API(createAxios(storage, showMessage)), [
    storage,
    showMessage
  ]);
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};

export default ApiProvider;
