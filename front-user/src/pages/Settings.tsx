import React from 'react';
import {
  IonPage, IonHeader, IonToolbar,
  IonButtons, IonMenuButton, IonTitle,
  IonContent, IonBackButton, IonList,
  IonItem, IonLabel, IonSelect, IonSelectOption
} from '@ionic/react';


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
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <SettingsItems />
      </IonContent>
    </IonPage>
  );
};

const SettingsItems = () => {
  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating">Language</IonLabel>
        <IonSelect>
          <IonSelectOption value="en" selected>English</IonSelectOption>
          <IonSelectOption value="fa">فارسی</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  );
};

export default SettingsPage;