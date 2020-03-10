import React from "react";

import { IonApp } from "@ionic/react";

import ExceptionHandler from "src/tools/ExceptionHandler";
import AlertProvider from "src/providers/AlertProvider";
import StateProvider from "src/providers/StateProvider";
import EventHandler from "src/tools/EventHandler";
import Routes from "./Routes";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "src/theme/variables.css";
import "src/theme/font/fonts.css";
import "src/theme/global.css";

const App: React.FC = () => {
  return (
    <IonApp>
      <ExceptionHandler>
        <AlertProvider>
          <StateProvider>
            <EventHandler />
            <Routes />
          </StateProvider>
        </AlertProvider>
      </ExceptionHandler>
    </IonApp>
  );
};

export default App;
