import React from 'react';
import {
  IonPage, IonHeader, IonToolbar,
  IonButtons, IonMenuButton, IonTitle,
  IonContent, IonBackButton, IonList,
  IonItem, IonLabel, IonSelect, IonSelectOption
} from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { setLang } from './Settings.reducer';
import { SelectChangeEventDetail } from '@ionic/core';


const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
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
        <IonLabel position="floating">Language</IonLabel>
        <IonSelect onIonChange={onLangChange}>
          <IonSelectOption {...langProps('en')}>English</IonSelectOption>
          <IonSelectOption {...langProps('fa')}>فارسی</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SettingsPage;