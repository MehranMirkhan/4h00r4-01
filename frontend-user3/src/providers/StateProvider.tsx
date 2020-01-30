import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import reducer from "src/reducers";
import axiosInstance from "src/tools/axiosInstance";

export const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

export default function({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
