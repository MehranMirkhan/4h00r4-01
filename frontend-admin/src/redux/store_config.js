import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Axios from 'axios';

import reducer from 'src/redux/reducer';
import { isAuthenticated, getAccessToken } from 'src/modules/auth/auth.reducer';

import config from 'src/app.config.json';


const persistConfig = {
  key: config.persist_key,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const API = Axios.create({
  baseURL: config.server_url,
  timeout: config.request_timeout,
  headers: { "Accept": "application/json", "Content-Type": "application/json" },
});

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk.withExtraArgument(API)));
const persistor = persistStore(store);

export { store, persistor };

API.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const state = store.getState();
      if (isAuthenticated(state))
        config.headers.Authorization = `Bearer ${getAccessToken(state)}`;
    }

    return config;
  },
);
