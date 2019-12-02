import React from 'react';
import {
  IonPage, IonHeader, IonToolbar,
  IonButtons, IonMenuButton, IonTitle,
  IonContent, IonBackButton, IonList,
  IonItem, IonLabel, IonSelect, IonSelectOption
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChangeEventDetail } from '@ionic/core';
import { Translate } from 'react-localize-redux';

import { setLang } from './Settings.reducer';
import config from '../../app.config.json';


const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle><Translate id="pages.settings.title" /></IonTitle>
        </IonToolbar>
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
        <IonSelect onIonChange={onLangChange}>
          {config.languages.map(l => <IonSelectOption key={l.code} {...langProps(l.code)}>{l.name}</IonSelectOption>)}
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SettingsPage;
