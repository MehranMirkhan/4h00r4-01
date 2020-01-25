import React from "react";
import { Redirect, Route } from "react-router-dom";

import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings, logIn, help } from "ionicons/icons";

import Menu from "src/widgets/Menu";
import Home from "src/pages/Home";

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
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu items={menuItems} />
        <IonRouterOutlet id="main">
          <Route exact path="/home" component={Home} />
          <Route path="/" render={() => <Redirect to="/home" exact />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
}
