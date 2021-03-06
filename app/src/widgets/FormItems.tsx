import React from "react";
import {
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonInput
} from "@ionic/react";
import { useTranslation } from "react-i18next";

export function Input({
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

export function SelectOne(params: ISelectOne) {
  const { t } = useTranslation();
  return (
    <>
      <IonLabel position="floating">{params.label}</IonLabel>
      <IonSelect
        onIonChange={(event: CustomEvent<any>) => {
          if (!!params.onChange) params.onChange(event.detail.value);
        }}
        okText={params.okText || t("OK")}
        cancelText={params.cancelText || t("Cancel")}
      >
        {params.options.map((opt: ISelectOneOption, index: number) => (
          <IonSelectOption
            key={index}
            value={opt.value}
            selected={params.value === opt.value}
          >
            {opt.name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </>
  );
}
