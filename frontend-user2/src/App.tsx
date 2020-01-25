import React from "react";

import { IonApp } from "@ionic/react";

import StorageProvider from "./providers/StorageProvider";
import ApiProvider from "./providers/ApiProvider";
import ServiceProvider from "./providers/ServiceProvider";
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

/* Theme variables */
import "./theme/variables.css";

/* Fonts */
import "./theme/font/fonts.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <IonApp>
      <StorageProvider>
        <ApiProvider>
          <ServiceProvider>
            <Routes />
          </ServiceProvider>
        </ApiProvider>
      </StorageProvider>
    </IonApp>
  );
};

export default App;
