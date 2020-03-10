import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IonActionSheet, IonButton } from "@ionic/react";

export default function Hints({
  hints,
  onBuy
}: {
  hints: Hint[];
  onBuy: (hint: Hint) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (!hints || hints.length === 0) return null;

  const btnHintItem = (hint: Hint) => ({
    text: `${t(hint.type)} - ${hint.price} ${'Coin'}`,
    icon: "flash",
    handler: () => {
      onBuy(hint);
    },
    disabled: !!hint.value
  });

  return (
    <>
      <IonActionSheet
        isOpen={open}
        onDidDismiss={onClose}
        buttons={hints.map(btnHintItem)}
      />
      <IonButton
        color="success"
        expand="block"
        style={{ marginTop: 16 }}
        onClick={onOpen}
      >
        {t("Hint")}
      </IonButton>
    </>
  );
}
