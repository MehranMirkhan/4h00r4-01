import React from 'react';
import {
  IonToolbar, IonButtons, IonMenuButton,
  IonBackButton, IonTitle,
} from '@ionic/react';
import { Translate } from 'react-localize-redux';


interface IToolbar {
  title?: string,
}

const Toolbar: React.FC<IToolbar> = ({ title }) => <>
  <IonToolbar color="dark">
    <IonButtons slot="start">
      <IonMenuButton />
    </IonButtons>
    <IonButtons slot="end">
      <IonBackButton defaultHref="/home" />
    </IonButtons>
    {!!title &&
      <IonTitle>
        <Translate id={title} />
      </IonTitle>
    }
  </IonToolbar>
</>;

export default Toolbar;