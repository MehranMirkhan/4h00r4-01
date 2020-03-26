import React from "react";
import { Redirect, Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";

import View from "./View";
import Edit from "./Edit";
import PasswordChange from "./PasswordChange";

export default function({ hasMe }: IProfile) {
  if (!hasMe) return <Redirect to="/home" exact />;

  return (
    <IonRouterOutlet>
      <Route exact path="/profile" component={View} />
      <Route exact path="/profile/edit" component={Edit} />
      <Route exact path="/profile/password-change" component={PasswordChange} />
    </IonRouterOutlet>
  );
}

interface IProfile {
  hasMe: boolean;
}
