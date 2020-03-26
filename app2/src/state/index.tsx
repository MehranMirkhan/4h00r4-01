import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Reducers
import metaReducer, { MetaState, initialState as metaInit } from "./meta";
import settingsReducer, {
  SettingsState,
  initialState as settingsInit
} from "./settings";
import newsReducer, { NewsState, initialState as newsInit } from "./news";
import authReducer, { AuthState, initialState as authInit } from "./auth";

// Sagas
import sagas from "./sagas";

export type AppState = {
  meta: MetaState;
  settings: SettingsState;
  news: NewsState;
  auth: AuthState;
};

export type StorageState = {
  settings: SettingsState;
};

const reducer = combineReducers({
  meta: metaReducer,
  settings: settingsReducer,
  news: newsReducer,
  auth: authReducer
});

export const initialState: AppState = {
  meta: { ...metaInit },
  settings: { ...settingsInit },
  news: { ...newsInit },
  auth: { ...authInit }
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(sagas);

export default function({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
