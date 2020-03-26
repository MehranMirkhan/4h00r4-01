import React from "react";
import { useTranslation } from "react-i18next";
import {
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle
} from "@ionic/react";

export default ({ title = "", showBack = true }: IToolbar) => {
  const { t } = useTranslation();
  return (
    <IonToolbar color="dark">
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      {showBack && (
        <IonButtons slot="end">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
      )}
      {!!title && <IonTitle>{t(title)}</IonTitle>}
    </IonToolbar>
  );
};

interface IToolbar {
  title?: string;
  showBack?: boolean;
}
