import React from "react";
import { IonLabel, IonItem, IonInput } from "@ionic/react";
import { useTranslation } from "react-i18next";

export default function({
  label = "",
  value,
  placeholder,
  type,
  onChange,
  className
}: IInput) {
  const { t } = useTranslation();
  return (
    <IonItem>
      <IonLabel position="floating">{t(label)}</IonLabel>
      <IonInput
        className={className}
        value={value}
        type={type}
        placeholder={placeholder}
        onIonChange={e => {
          if (!!onChange) onChange(e.detail.value || "");
        }}
      />
    </IonItem>
  );
}

type IInput = {
  label?: string;
  value: string;
  placeholder?: string;
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
  className?: string;
  onChange?: (value: string) => void;
};
