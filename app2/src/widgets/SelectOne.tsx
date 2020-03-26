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
  return (
    <>
      <IonLabel position="floating" data-testid="so-label">
        {t(label)}
      </IonLabel>
      <IonSelect
        value={value}
        onIonChange={(event: CustomEvent<any>) => {
          const v = event.detail.value;
          if (!!onChange && v !== value) onChange(v);
        }}
        okText={t(okText || "OK")}
        cancelText={t(cancelText || "Cancel")}
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
