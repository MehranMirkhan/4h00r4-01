import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Axios from 'axios';

import reducer from './reducer';
// import { isAuthenticated, getAccessToken } from 'src/modules/auth/auth.reducer';

import config from '../app.config.json';


export const API = Axios.create({
  baseURL: config.server_url,
  timeout: config.request_timeout,
  headers: { "Accept": "application/json", "Content-Type": "application/json" },
});

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(API)));

export { store };

// API.interceptors.request.use(
//   config => {
//     if (!config.headers.Authorization) {
//       const state = store.getState();
//       if (isAuthenticated(state))
//         config.headers.Authorization = `Bearer ${getAccessToken(state)}`;
//     }

//     return config;
//   },
// );
