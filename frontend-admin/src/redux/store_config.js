import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import reducer from 'src/redux/reducer';
// import API from 'API';

const persistConfig = {
  key: 'puzzles_ugQzdLOtUd',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk/*.withExtraArgument(API)*/));
const persistor = persistStore(store);

export { store, persistor };
