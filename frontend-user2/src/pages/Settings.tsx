import React, { useContext } from "react";
import { IonList, IonItem } from "@ionic/react";
import { useTranslation } from "react-i18next";

import Page from "src/widgets/Page";
import { SelectOne } from "src/widgets/FormItems";
import { storageContext } from "src/providers/StorageProvider";

export default function() {
  const { t } = useTranslation();
  const {
    storageState: { settings },
    storageActions: { setSettings }
  } = useContext(storageContext);
  const onSettingChange = (key: string) => (value: string) => {
    setSettings({ ...settings, [key]: value });
    window.location.reload();
  };
  return (
    <Page title={t("Settings")} showBack={true}>
      <IonList>
        <IonItem>
          <SelectOne
            label={t("Language")}
            value={settings.lang}
            options={[
              { name: "English", value: "en" },
              { name: "فارسی", value: "fa" }
            ]}
            onChange={onSettingChange("lang")}
          />
        </IonItem>
      </IonList>
    </Page>
  );
}
