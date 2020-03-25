import React from "react";
import { IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import { useTranslation } from "react-i18next";

export default ({
  label,
  options,
  value,
  okText,
  cancelText,
  onChange
}: ISelectOne) => {
  const { t } = useTranslation();
  let selectedText = "";
  for (let opt of options) {
    if (opt.value === value) {
      selectedText = opt.name;
      break;
    }
  }
  return (
    <>
      <IonLabel position="floating" data-testid="so-label">{t(label)}</IonLabel>
      <IonSelect
        onIonChange={(event: CustomEvent<any>) => {
          if (!!onChange) onChange(event.detail.value);
        }}
        okText={t(okText || "OK")}
        cancelText={t(cancelText || "Cancel")}
        selectedText={selectedText}
      >
        {options.map((opt: ISelectOneOption) => (
          <IonSelectOption key={opt.value} value={opt.value}>
            {opt.name}
          </IonSelectOption>
        ))}
      </IonSelect>
    </>
  );
};

interface ISelectOne {
  label: string;
  options: ISelectOneOption[];
  value: any;
  okText?: string | undefined;
  cancelText?: string | undefined;
  onChange?: ((value: any) => void) | undefined;
}

type ISelectOneOption = { value: any; name: string };
