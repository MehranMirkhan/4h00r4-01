import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Axios from 'axios';

import reducer from './reducer';
import { isAuthenticated, getAccessToken } from '../pages/Auth/Auth.reducer';

import config from '../app.config.json';
import { initialLoad as initializeAuth } from '../pages/Auth/Auth.reducer';
import { initialLoad as initializeSettings } from '../pages/Settings/Settings.reducer';


export const API = Axios.create({
  baseURL: config.server_url,
  timeout: config.request_timeout,
  headers: { "Accept": "application/json", "Content-Type": "application/json" },
});

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(API)));

export { store };

API.interceptors.request.use(
  request => {
    if (!request.headers.Authorization) {
      const state = store.getState();
      if (isAuthenticated(state))
        request.headers.Authorization = `Bearer ${getAccessToken(state)}`;
    }

    return request;
  },
  // error => {
  //   alert("Network error");
  // }
);

// API.interceptors.response.use(
//   res => res,
//   error => {
//     alert("Intercept error");
//     console.log(error);
//     if (!!error.response && !!error.response.data && !!error.response.data.message) {
//       alert(JSON.stringify(error.response.data.message));
//     }
//   }
// );

if (config.log) {
  API.interceptors.request.use(request => {
    console.log('Request:', request);
    return request;
  });
  API.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  });
}

// Initializing states
store.dispatch(initializeAuth());
store.dispatch(initializeSettings());
