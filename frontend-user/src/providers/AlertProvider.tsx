import React, { createContext, useState } from "react";
import { IonAlert } from "@ionic/react";
import { useTranslation } from "react-i18next";

export const alertContext = createContext<ShowMessage>(
  (header?: string, message?: string, uptime?: number) => {}
);

export default ({ children }: any) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showMessage: ShowMessage = (
    header?: string,
    message?: string,
    uptime?: number
  ) => {
    header = header || "";
    message = message || "";
    uptime = uptime || 1000;
    setHeader(header);
    setMessage(message);
    if (uptime >= 0) setTimeout(onClose, uptime);
    onOpen();
  };
  return (
    <>
      <IonAlert
        isOpen={open}
        onDidDismiss={onClose}
        header={t(header)}
        message={t(message)}
        buttons={[t("OK")]}
      />
      <alertContext.Provider value={showMessage}>
        {children}
      </alertContext.Provider>
    </>
  );
};
