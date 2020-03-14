import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IonActionSheet, IonButton } from "@ionic/react";

import { isRegistered } from "src/reducers/auth.reducer";
import { alertContext } from "src/providers/AlertProvider";

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

  const hasMe = isRegistered(useSelector((state: State) => state));
  const showMessage = useContext(alertContext);

  if (!hints || hints.length === 0) return null;

  const btnHintItem = (hint: Hint) => ({
    text: `${t(hint.type)} - ${hint.price} ${t("Coin")}`,
    icon: "flash",
    handler: () => {
      if (hasMe) onBuy(hint);
      else showMessage("Error", "Please register first", 3000);
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
