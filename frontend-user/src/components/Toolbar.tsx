import React from 'react';
import {
  IonToolbar, IonButtons, IonMenuButton,
  IonBackButton, IonTitle,
} from '@ionic/react';
import { Translate } from 'react-localize-redux';


interface IToolbar {
  title?: string,
  showBack?: boolean,
}

const Toolbar: React.FC<IToolbar> = ({ title, showBack = true }) => <>
  <IonToolbar color="dark">
    <IonButtons slot="start">
      <IonMenuButton />
    </IonButtons>
    {showBack &&
      <IonButtons slot="end">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
    }
    {!!title &&
      <IonTitle>
        <Translate id={title} />
      </IonTitle>
    }
  </IonToolbar>
</>;

export default Toolbar;