import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, settings, logIn, trophy } from "ionicons/icons";

import { AppState } from "src/state";
import { langSelector } from "src/state/settings";

import Menu from "src/widgets/Menu";

import Home from "src/pages/Home";
import Settings from "src/pages/Settings";
import Auth from "src/pages/Auth";
import Daily from "src/pages/Daily";
import Weekly from "src/pages/Weekly";

const menuItems = [
  { title: "Home", url: "/home", icon: home },
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
  { title: "Settings", url: "/settings", icon: settings }
];

function Pages({ lang }: IPages) {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang || "en");
  }, [lang]);
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
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/daily" component={Daily} />
            <Route exact path="/weekly" component={Weekly} />
            {/* <Route path="/question/:id" component={Question} /> */}
            <Route path="*" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </>
  );
}

interface IPages {
  lang: string;
}

const props = (state: AppState) => ({ lang: langSelector(state) });

export default connect(props)(Pages);
