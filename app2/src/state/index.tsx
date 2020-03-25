import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Reducers
import runReducer, { RunState, initialState as runInit } from "./run";
import settingsReducer, {
  SettingsState,
  initialState as settingsInit
} from "./settings";
import newsReducer, { NewsState, initialState as newsInit } from "./news";

// Sagas
import sagas from "./sagas";

export type AppState = {
  run: RunState;
  settings: SettingsState;
  news: NewsState;
};

export type StorageState = {
  settings: SettingsState;
};

const reducer = combineReducers({
  run: runReducer,
  settings: settingsReducer,
  news: newsReducer
});

export const initialState: AppState = {
  run: { ...runInit },
  settings: { ...settingsInit },
  news: { ...newsInit }
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(sagas);

export default function({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
