import React from "react";
import { IonButton } from "@ionic/react";

export default ({ to, children, ...otherProps }: any) => {
  return (
    <IonButton routerLink={to} routerDirection="forward" {...otherProps}>
      {children}
    </IonButton>
  );
};
