import React from "react";
import { Redirect, Route } from "react-router-dom";

import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home } from "ionicons/icons";

// import Menu from "src/widgets/Menu";

// import Home from "src/pages/Home";

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: home
  }
];

export default function() {
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        {/* <Menu items={menuItems} /> */}
        <IonRouterOutlet id="main">
          <Route exact path="/home" component={() => null} />
          <Route path="*" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
}
