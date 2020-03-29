import React from "react";
import { IonLabel, IonItem, IonInput } from "@ionic/react";
import { useTranslation } from "react-i18next";

export default function({
  label = "",
  value,
  type,
  onChange,
  ...otherProps
}: IInput) {
  const { t } = useTranslation();
  return (
    <IonItem>
      <IonLabel position="floating">{t(label)}</IonLabel>
      <IonInput
        value={value}
        type={type}
        onIonChange={e => {
          if (!!onChange) onChange(e.detail.value || "");
        }}
        {...otherProps}
      />
    </IonItem>
  );
}

type IInput = {
  label?: string;
  value: string;
  type?:
    | "number"
    | "time"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "search"
    | "date"
    | "password";
  onChange?: (value: string) => void;
  [key: string]: any;
};
