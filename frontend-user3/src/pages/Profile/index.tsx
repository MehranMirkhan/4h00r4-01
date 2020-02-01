import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { IonRouterOutlet } from "@ionic/react";

import { isRegistered } from "src/reducers/auth.reducer";

import View from "./View";
import Edit from "./Edit";
import PasswordChange from "./PasswordChange";

const ProfilePage: React.FC = () => {
  const hasMe = useSelector(isRegistered);
  if (!hasMe) return <Redirect to="/home" exact />;

  return (
    <IonRouterOutlet>
      <Route exact path="/profile" component={View} />
      <Route exact path="/profile/edit" component={Edit} />
      <Route exact path="/profile/password-change" component={PasswordChange} />
    </IonRouterOutlet>
  );
};

export default ProfilePage;
