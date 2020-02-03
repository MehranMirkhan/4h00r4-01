import React from "react";
import { IonButton } from "@ionic/react";
import { useTranslation } from "react-i18next";

export function LinkButton({ to, children, ...otherProps }: any) {
  return (
    <IonButton routerLink={to} routerDirection="forward" {...otherProps}>
      {children}
    </IonButton>
  );
}

export function SubmitButton({ label, onSubmit, disabled }: any) {
  const { t } = useTranslation();
  return (
    <IonButton
      className="submit-button"
      type="submit"
      color="primary"
      expand="block"
      onClick={onSubmit}
      disabled={disabled}
    >
      {t(label)}
    </IonButton>
  );
}
