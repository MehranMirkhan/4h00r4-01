import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Plugins } from "@capacitor/core";

import config from "src/app.config.json";
import Storage from "src/tools/Storage";
import axiosInstance from "src/tools/axiosInstance";
import { alertContext } from "src/providers/AlertProvider";

import { refresh } from "src/reducers/auth.reducer";
import { syncWithServer } from "src/services/level.service";
import { store } from "src/providers/StateProvider";

const { Network } = Plugins;

export default function() {
  const { auth, settings, level } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const showMessage = useContext(alertContext);
  const { i18n } = useTranslation();

  // Events
  useEffect(() => {
    Storage.setObject("auth", auth);
  }, [auth]);
  useEffect(() => {
    Storage.setObject("settings", settings);
    i18n.changeLanguage(settings.lang || "en");
  }, [settings, i18n]);
  useEffect(() => {
    Storage.setObject("level", level);
    syncWithServer(level, dispatch);
  }, [level, dispatch]);

  useEffect(() => {
    const responseListener = axiosInstance.interceptors.response.use(
      res => res,
      error => {
        if (
          error.code === "ECONNABORTED" ||
          error.message === "Network Error"
        ) {
          Network.getStatus().then((netStat: NetworkStatus) => {
            if (netStat.connected) {
              // Try again
              setTimeout(() => axiosInstance.request(error.config), 1000);
            } /*else {
              if (!!showMessage)
                showMessage("Error", "Error connecting to server", 2000);
            }*/
          });
        } else if (error.response.status === 401) {
          if (!!auth) {
            // if (!auth.token) dispatch(register());
            // else dispatch(refresh());
            if (!!auth.token) {
              dispatch(refresh());
            } else showMessage("Error", "Please register first", -1);
          }
        } else if (Math.floor(error.response.status / 100) === 4) {
          showMessage(
            "Error",
            error.response.data.message || "Unknown error",
            -1
          );
        }
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(responseListener);
    };
  }, [auth, showMessage, dispatch]);

  return <></>;
}

// setTimeout(() => {
//   const { auth } = store.getState();
//   if (!!auth && !auth.token) store.dispatch(register());
// }, 5000);

Network.addListener("networkStatusChange", (status: NetworkStatus) => {
  if (status.connected) {
    if (config.log) console.log("Network connected");
    const { level } = store.getState();
    // if (!!auth && !auth.token) store.dispatch(register());
    syncWithServer(level, store.dispatch);
    // window.location.reload();
  }
});
