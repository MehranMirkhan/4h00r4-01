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
import dailyReducer, { DailyState, initialState as dailyInit } from "./daily";
import weeklyReducer, {
  WeeklyState,
  initialState as weeklyInit
} from "./weekly";
import questionReducer, {
  QuestionState,
  initialState as questionInit
} from "./question";

// Sagas
import sagas from "./sagas";

export type AppState = {
  meta: MetaState;
  settings: SettingsState;
  news: NewsState;
  auth: AuthState;
  daily: DailyState;
  weekly: WeeklyState;
  question: QuestionState;
};

export type StorageState = {
  settings: SettingsState;
};

const reducer = combineReducers({
  meta: metaReducer,
  settings: settingsReducer,
  news: newsReducer,
  auth: authReducer,
  daily: dailyReducer,
  weekly: weeklyReducer,
  question: questionReducer
});

export const initialState: AppState = {
  meta: { ...metaInit },
  settings: { ...settingsInit },
  news: { ...newsInit },
  auth: { ...authInit },
  daily: { ...dailyInit },
  weekly: { ...weeklyInit },
  question: { ...questionInit }
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(sagas);

export default function({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
