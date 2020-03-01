import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { IonIcon, IonButton } from "@ionic/react";
import { contact, create, sync } from "ionicons/icons";

import { getMe, fetchMe } from "src/reducers/auth.reducer";
import Page from "src/widgets/Page";

import "./View.css";

const View: React.FC = () => {
  const { t } = useTranslation();
  const me = useSelector(getMe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  return (
    <Page title={t("Profile")} showBack={true}>
      <div className="center">
        <IonIcon icon={contact} className="profile-pic" />
        <div className="user-name">{me.name}</div>
        <div className="vs24" />
        <div>
          {t("Phone")}: {me.phone}
        </div>
        <div>
          {t("Email")}: {me.email}
        </div>
        <div className="vs24" />
        <div className="sep" />
        <div className="vs24" />
        <div>
          {t("Level")}: {me.level}
        </div>
        <div className="vs24" />
        <div className="sep" />
        <div className="vs24" />
        <div>
          {t("Coin")} 1: {me.coin_1}
        </div>
        <div className="vs24" />
        <div>
          {t("Coin")} 2: {me.coin_2}
        </div>
        <div className="vs24" />
        <div className="sep" />
        <div className="vs24" />
        <IonButton routerLink="/profile/edit" routerDirection="forward">
          <IonIcon slot="start" icon={create} color="light" />
          {t("Edit")}
        </IonButton>
        <br />
        <IonButton
          routerLink="/profile/password-change"
          routerDirection="forward"
          color="danger"
        >
          <IonIcon slot="start" icon={sync} color="light" />
          {t("Change Password")}
        </IonButton>
      </div>
    </Page>
  );
};

export default View;
