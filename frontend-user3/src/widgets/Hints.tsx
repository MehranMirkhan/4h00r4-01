import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IonActionSheet, IonButton } from "@ionic/react";

export default function Hints({
  hints,
  onBuy
}: {
  hints: Hint[];
  onBuy: (id: number) => void;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  if (!hints || hints.length === 0) return null;

  const btnHintItem = (hint: Hint) => ({
    text: `${hint.type} - ${hint.price} Gold`,
    icon: "flash",
    handler: () => {
      onBuy(hint.id);
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
        {t("Hints")}
      </IonButton>
    </>
  );
}
