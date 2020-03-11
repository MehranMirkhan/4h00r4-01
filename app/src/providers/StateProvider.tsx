import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import api from "src/api";
import reducer from "src/reducers";
import config from "src/app.config.json";
import Storage from "src/tools/Storage";

import { setToken, setMe } from "src/reducers/auth.reducer";
import { setLang } from "src/reducers/settings.reducer";
import { setCurrentLevel, setLevelHints } from "src/reducers/level.reducer";

export const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

export default function({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}

// Initializing state
Storage.getObject("auth").then((a: AuthState) => {
  if (config.log) console.log("Storage loaded auth:", a);
  if (!!a) {
    store.dispatch(setToken(a.token));
    store.dispatch(setMe(a.me));
  }
});
Storage.getObject("settings").then((s: SettingsState) => {
  if (config.log) console.log("Storage loaded settings:", s);
  if (!!s) {
    store.dispatch(setLang(s.lang));
  }
});
Storage.getObject("level").then((l: LevelState) => {
  if (config.log) console.log("Storage loaded level:", l);
  if (!!l) {
    store.dispatch(setCurrentLevel(l.currentLevel));
    store.dispatch(setLevelHints(l.levelHints));
  }
});
