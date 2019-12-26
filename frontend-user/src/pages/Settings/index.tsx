import React from 'react';
import {
  IonPage, IonHeader,
  IonContent, IonList,
  IonItem, IonLabel, IonSelect, IonSelectOption
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChangeEventDetail } from '@ionic/core';
import { Translate } from 'react-localize-redux';

import { setLang } from './Settings.reducer';
import config from '../../app.config.json';
import { translate } from '../../utils';
import Toolbar from '../../components/Toolbar';


const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.settings.title"/>
      </IonHeader>

      <IonContent>
        <SettingsItems />
      </IonContent>
    </IonPage>
  );
};

const SettingsItems = () => {
  const settings = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  const langProps = (lang: String) => ({
    value: lang,
    selected: settings.lang === lang,
  });
  const onLangChange = (event: CustomEvent<SelectChangeEventDetail>) => {
    dispatch(setLang(event.detail.value));
    window.location.reload();
  };
  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating"><Translate id="pages.settings.lang" /></IonLabel>
        <IonSelect onIonChange={onLangChange}
          okText={translate(settings.lang, "ok")}
          cancelText={translate(settings.lang, "cancel")}>
          {config.languages.map(l => <IonSelectOption key={l.code} {...langProps(l.code)}>{l.name}</IonSelectOption>)}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SettingsPage;
