import React, { useState, useContext } from 'react';
import {
  IonPage, IonHeader, IonContent, IonList,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/react';

import Toolbar from '../../components/Toolbar';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import { AlertContext } from '../../components/AlertController';
import { login, getMe } from '../Auth/Auth.reducer';


const PC: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const alertContext = useContext(AlertContext);
  const me = useSelector(getMe);

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
          <IonButton type="submit" color="success"
            onClick={() => dispatch(changePassword(me, alertContext)({ oldPassword, password, passwordConfirm }))}>
            <Translate id="submit" />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

const changePassword = (me: any, alertContext: any) =>
  ({ oldPassword, password, passwordConfirm }: any) =>
    (dispatch: any, _: any, API: any) => {
      if (password !== passwordConfirm) {
        alertContext("pages.profile.wrongPasswordConfirm");
        return;
      }
      API.post('/password', { old_password: oldPassword, new_password: password }).then((res: any) => {
        if (!!res && res.status === 200) {
          dispatch(login(me.phone, password));
          alertContext(res.data.message);
        }
      });
    }

export default PC;