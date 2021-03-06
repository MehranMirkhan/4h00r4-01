import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings, logIn, trophy } from "ionicons/icons";

import Menu from "src/widgets/Menu";

import Home from "src/pages/Home";
import Settings from "src/pages/Settings";
import Auth from "src/pages/Auth";
import Profile from "src/pages/Profile";
import LevelList from "src/pages/LevelList";
import Level from "src/pages/Level";
import QuestionList from "src/pages/QuestionList";
import Question from "src/pages/Question";
import Leaderboard from "src/pages/Leaderboard";

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: home
  },
  {
    title: "Leader Board",
    url: "/leaderboard",
    icon: trophy
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
  const lang = useSelector((state: State) => state.settings.lang);
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
            <Route exact path="/auth" component={Auth} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/level_list" component={LevelList} />
            <Route path="/level/:id" component={Level} />
            <Route path="/question_list" component={QuestionList} />
            <Route path="/question/:id" component={Question} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/" render={() => <Redirect to="/home" exact />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </>
  );
}
