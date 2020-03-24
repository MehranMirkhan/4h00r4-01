import React from "react";
import { IonIcon, IonButton } from "@ionic/react";
import { useTranslation } from "react-i18next";

export default function({ text, icon, link, href, ...otherProps }: IButton) {
  const { t } = useTranslation();
  const props: any = {};
  if (link) {
    props.routerDirection = "forward";
    props.routerLink = href;
  }
  return (
    <IonButton {...props} {...otherProps}>
      {!!text ? t(text) : null}
      {!!icon ? <IonIcon icon={icon} /> : null}
    </IonButton>
  );
}

interface IButton {
  text?: string;
  icon?: any;
  link?: boolean;
  href?: string;
  [key: string]: any;
}
