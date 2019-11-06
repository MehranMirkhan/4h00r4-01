import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import { store, persistor } from 'src/redux/store_config';
import ErrorHandler, { AlertTemplate } from 'src/ErrorHandler';
import Routes from 'src/Routes';

import 'src/font/fonts.css';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate}
          timeout={5000} position={positions.TOP_CENTER} transition={transitions.SCALE}>
          <ErrorHandler>
            <Routes />
          </ErrorHandler>
        </AlertProvider>
      </PersistGate>
    </Provider>
  );
}
