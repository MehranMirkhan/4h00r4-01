import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate } from 'react-localize-redux';

import { IonIcon, IonButton, IonPage, IonHeader, IonContent } from '@ionic/react';
import { contact, create, sync } from 'ionicons/icons';

import Toolbar from '../../components/Toolbar';
import { getMe, fetchMe } from '../Auth/Auth.reducer';

import './View.css';


const View: React.FC = () => {
  const me = useSelector(getMe);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchMe());
  }, []);
  return (
  <IonPage>
    <IonHeader>
      <Toolbar title="pages.profile.title" />
    </IonHeader>

    <IonContent>
      <div className="center">
        <IonIcon icon={contact} className="profile-pic" />
        <div className="user-name">{me.name}</div>
        <div className="vs24" />
        <div><Translate id="user.phone" />: {me.phone}</div>
        <div><Translate id="user.email" />: {me.email}</div>
        <div className="vs24" />
        <div className="sep" />
        <div className="vs24" />
        <div><Translate id="user.level" />: {me.level}</div>
        <div className="vs24" />
        <div className="sep" />
        <div className="vs24" />
        <div><Translate id="user.coin_1" />: {me.coin_1}</div>
        <div className="vs24" />
        <div><Translate id="user.coin_2" />: {me.coin_2}</div>
        <div className="vs24" />
        <div className="sep" />
        <div className="vs24" />
        <IonButton routerLink="/profile/edit" routerDirection="forward">
          <IonIcon slot="start" icon={create} color="light" />
          <Translate id="pages.profile.edit" />
        </IonButton>
        <br />
        <IonButton routerLink="/profile/password-change" routerDirection="forward" color="danger">
          <IonIcon slot="start" icon={sync} color="light" />
          <Translate id="pages.profile.passwordChange" />
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
  );
}

export default View;