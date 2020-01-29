import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings, logIn, help } from "ionicons/icons";

import Menu from "src/widgets/Menu";
import Home from "src/pages/Home";
import Settings from "src/pages/Settings";
import { storageContext } from "./providers/StorageProvider";

const menuItems = [
  {
    title: "home",
    url: "/home",
    icon: home
  },
  {
    title: "menu.level",
    url: "/level_list",
    icon: help
  },
  {
    title: "menu.daily",
    url: "/question_list?type=daily",
    icon: help
  },
  {
    title: "menu.weekly",
    url: "/question_list?type=weekly",
    icon: help
  },
  {
    title: "menu.auth",
    url: "/auth",
    icon: logIn
  },
  {
    title: "menu.settings",
    url: "/settings",
    icon: settings
  }
];

export default function() {
  const {
    storageState: {
      settings: { lang }
    }
  } = useContext(storageContext);
  return (
    <>
      {lang === "fa" && (
        <link rel="stylesheet" type="text/css" href="rtl.css" />
      )}
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu items={menuItems} />
          <IonRouterOutlet id="main">
            <Route exact path="/home" component={Home} />
            <Route exact path="/settings" component={Settings} />
            <Route path="/" render={() => <Redirect to="/home" exact />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </>
  );
}
