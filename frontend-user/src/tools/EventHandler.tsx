import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import config from "src/app.config.json";
import Storage from "src/tools/Storage";
import axiosInstance from "src/tools/axiosInstance";
import { alertContext } from "src/providers/AlertProvider";

import { setToken, setMe, register } from "src/reducers/auth.reducer";
import { setLang } from "src/reducers/settings.reducer";
import { setCurrentLevel, setLevelHints } from "src/reducers/level.reducer";
import { syncWithServer } from "src/services/level.service";

export default function() {
  const { auth, settings, level } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const showMessage = useContext(alertContext);

  // Initial actions
  useEffect(() => {
    // Loading from local storage
    Storage.getObject("auth").then((a: AuthState) => {
      if (config.log) console.log("Storage loaded auth:", a);
      if (!!a) {
        dispatch(setToken(a.token));
        dispatch(setMe(a.me));
      }
    });
    Storage.getObject("settings").then((s: SettingsState) => {
      if (config.log) console.log("Storage loaded settings:", s);
      if (!!s) {
        dispatch(setLang(s.lang));
      }
    });
    Storage.getObject("level").then((l: LevelState) => {
      if (config.log) console.log("Storage loaded level:", l);
      if (!!l) {
        dispatch(setCurrentLevel(l.currentLevel));
        dispatch(setLevelHints(l.levelHints));
      }
    });
  }, [dispatch]);

  // Events
  useEffect(() => {
    Storage.setObject("auth", auth);
  }, [auth]);
  useEffect(() => {
    Storage.setObject("settings", settings);
  }, [settings]);
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
          if (!!showMessage) showMessage("Error", "Network Error", 2000);
        } else if (error.response.status === 401) {
          if (!!auth && !auth.token) dispatch(register());
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
