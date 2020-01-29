import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings, logIn, help } from "ionicons/icons";

import { storageContext } from "src/providers/StorageProvider";

import Menu from "src/widgets/Menu";

import Home from "src/pages/Home";
import Settings from "src/pages/Settings";
import QuestionList from "src/pages/QuestionList";


const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: home
  },
  {
    title: "Level",
    url: "/level_list",
    icon: help
  },
  {
    title: "Daily",
    url: "/question_list?type=daily",
    icon: help
  },
  {
    title: "Weekly",
    url: "/question_list?type=weekly",
    icon: help
  },
  {
    title: "Login / Register",
    url: "/auth",
    icon: logIn
  },
  {
    title: "Settings",
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
            {/* <Route path="/auth" component={Auth} /> */}
            {/* <Route path="/profile" component={Profile} /> */}
            <Route exact path="/settings" component={Settings} />
            {/* <Route exact path="/level_list" component={LevelList} /> */}
            {/* <Route path="/level/:id" component={Level} /> */}
            <Route path="/question_list" component={QuestionList} />
            {/* <Route path="/question/:id" component={Question} /> */}
            <Route path="/" render={() => <Redirect to="/home" exact />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </>
  );
}
