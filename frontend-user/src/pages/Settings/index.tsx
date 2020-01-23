import React, { useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
// import { useSelector, useDispatch } from "react-redux";
import { SelectChangeEventDetail } from "@ionic/core";
import { Translate } from "react-localize-redux";

// import { setLang } from "./Settings.reducer";
import config from "../../app.config.json";
import { translate } from "../../utils";
import Toolbar from "../../components/Toolbar";
import { storageContext } from "../../providers/StorageProvider";

const SettingsPage: React.FC = () => {
  const storage = useContext(storageContext);
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.settings.title" />
      </IonHeader>

      <IonContent>
        <SettingsItems
          settings={storage.state.settings}
          setSettings={
            !!storage.actions ? storage.actions.setSettings : (_: any) => {}
          }
        />
      </IonContent>
    </IonPage>
  );
};

const SettingsItems: React.FC<any> = ({ settings, setSettings }) => {
  const langProps = (lang: String) => ({
    value: lang,
    selected: settings.lang === lang
  });
  const onLangChange = (event: CustomEvent<SelectChangeEventDetail>) => {
    setSettings({ ...settings, lang: event.detail.value });
    window.location.reload();
  };
  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating">
          <Translate id="pages.settings.lang" />
        </IonLabel>
        <IonSelect
          onIonChange={onLangChange}
          okText={translate(settings.lang, "ok")}
          cancelText={translate(settings.lang, "cancel")}
        >
          {config.languages.map(l => (
            <IonSelectOption key={l.code} {...langProps(l.code)}>
              {l.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SettingsPage;
