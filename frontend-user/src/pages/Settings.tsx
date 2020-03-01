import React from "react";
import { IonList, IonItem } from "@ionic/react";
import { useTranslation } from "react-i18next";

import Page from "src/widgets/Page";
import { SelectOne } from "src/widgets/FormItems";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "src/reducers/settings.reducer";

export default function() {
  const { t } = useTranslation();
  const settings = useSelector((state: State) => state.settings);
  const dispatch = useDispatch();
  const onLangChange = (lang: string) => {
    dispatch(setLang(lang));
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
            onChange={onLangChange}
          />
        </IonItem>
      </IonList>
    </Page>
  );
}
