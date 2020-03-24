import React from "react";
import {
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle
} from "@ionic/react";

export default ({ title = "", showBack = true }: IToolbar) => (
  <IonToolbar color="dark">
    <IonButtons slot="start">
      <IonMenuButton />
    </IonButtons>
    {showBack && (
      <IonButtons slot="end">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
    )}
    {!!title && <IonTitle>{title}</IonTitle>}
  </IonToolbar>
);

interface IToolbar {
  title?: string;
  showBack?: boolean;
}
