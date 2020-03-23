import React from "react";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// Reducers
import newsReducer, { NewsState } from "./news";

// Sagas
import sagas from "./sagas";

export type AppState = {
  news: NewsState;
};

const reducer = combineReducers({ news: newsReducer });

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(sagas);

export default function({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
