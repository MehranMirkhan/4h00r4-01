import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonContent, IonList,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/react';

import Toolbar from '../../components/Toolbar';
import { Translate } from 'react-localize-redux';


const PC: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.profile.pcTitle" />
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating"><Translate id="pages.profile.oldPassword" /></IonLabel>
            <IonInput type="password" value={oldPassword}
              onIonChange={e => setOldPassword(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating"><Translate id="pages.auth.password" /></IonLabel>
            <IonInput type="password" value={password}
              onIonChange={e => setPassword(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating"><Translate id="pages.auth.passwordConfirm" /></IonLabel>
            <IonInput type="password" value={passwordConfirm}
              onIonChange={e => setPasswordConfirm(e.detail.value as string)} />
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

export default PC;