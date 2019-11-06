import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from 'src/redux/reducer';
import Axios from 'axios';

const persistConfig = {
  key: 'puzzles_ugQzdLOtUd',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const API = Axios.create({
  baseURL: 'http://localhost/4h00r4-01/backend/public/api',
  timeout: 3000,
  headers: {"Accept": "application/json", "Content-Type": "application/json"},
});

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk.withExtraArgument(API)));
const persistor = persistStore(store);

export { store, persistor };
