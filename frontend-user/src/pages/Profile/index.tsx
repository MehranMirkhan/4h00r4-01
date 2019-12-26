import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import {
  IonPage, IonHeader, IonContent,
} from '@ionic/react';

import { getMe } from '../Auth/Auth.reducer';

import './Profile.css';
import Toolbar from '../../components/Toolbar';


const ProfilePage: React.FC = () => {
  const me = useSelector(getMe);

  const hasMe = !!me && Object.keys(me).length > 0;
  if (!hasMe) return <Redirect to="/home" exact />;

  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.profile.title"/>
      </IonHeader>

      <IonContent>
      </IonContent>
    </IonPage>
  );
}

export default ProfilePage;