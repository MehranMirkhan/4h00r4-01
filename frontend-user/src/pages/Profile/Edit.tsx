import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate } from 'react-localize-redux';
import {
  IonList, IonItem, IonLabel, IonInput,
  IonButton, IonPage, IonHeader, IonContent,
} from '@ionic/react';

import Toolbar from '../../components/Toolbar';
import { getMe, fetchMe } from '../Auth/Auth.reducer';
import { User } from '../../declarations';
import { AlertContext } from '../../components/AlertController';


const Edit: React.FC = () => {
  const me = useSelector(getMe);
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const dispatch = useDispatch();
  const alertContext = useContext(AlertContext);

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
          <IonButton type="submit" color="success"
            onClick={() => dispatch(updateMe(alertContext)({ name, email }))}>
            <Translate id="submit" />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

const updateMe = (alertContext: any) => (me: User) => (dispatch: any, _: any, API: any) => {
  API.patch('/v1/me', me).then((res: any) => {
    if (!!res && res.status === 200) {
      dispatch(fetchMe());
      alertContext(res.data.message);
    }
  });
}

export default Edit;