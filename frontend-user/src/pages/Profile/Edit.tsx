import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Translate } from 'react-localize-redux';
import {
  IonList, IonItem, IonLabel, IonInput,
  IonButton, IonPage, IonHeader, IonContent,
} from '@ionic/react';

import Toolbar from '../../components/Toolbar';
import { getMe } from '../Auth/Auth.reducer';


const Edit: React.FC = () => {
  const me = useSelector(getMe);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.profile.editTitle" />
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating"><Translate id="user.name" /></IonLabel>
            <IonInput type="text" autofocus value={name}
              placeholder={me.name}
              onIonChange={e => setName(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating"><Translate id="user.email" /></IonLabel>
            <IonInput type="text" autofocus value={email}
              placeholder={me.email}
              onIonChange={e => setEmail(e.detail.value as string)} />
          </IonItem>
        </IonList>
        <div className="vs24" />
        <div className="center">
          <IonButton type="submit" color="success">
            <Translate id="submit" />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Edit;