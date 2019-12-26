import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  IonPage, IonHeader,
  IonContent, IonInput,
  IonLabel, IonSegment, IonSegmentButton,
  IonItem, IonButton,
} from '@ionic/react';
import { Translate } from 'react-localize-redux';
import { login, getMe, register } from './Auth.reducer';
import Toolbar from '../../components/Toolbar';


const AuthPage: React.FC = () => {
  const me = useSelector(getMe);
  const [tab, setTab] = useState("login");

  const hasMe = !!me && Object.keys(me).length > 0;
  if (hasMe) return <Redirect to="/home" exact />;

  return (
    <IonPage>
      <IonHeader>
        <Toolbar title="pages.auth.title"/>
      </IonHeader>

      <IonContent>
        <IonSegment onIonChange={e => setTab(e.detail.value as string)}>
          <IonSegmentButton value="login" checked={tab === "login"}>
            <IonLabel><Translate id="pages.auth.login" /></IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="signup" checked={tab === "signup"}>
            <IonLabel><Translate id="pages.auth.signup" /></IonLabel>
          </IonSegmentButton>
        </IonSegment>
        {tab === "login" ? <Login /> : <Register />}
      </IonContent>
    </IonPage>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      {/* <div style={{ marginTop: '30%' }}> */}
      <div>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.username" /></IonLabel>
          <IonInput type="number" autofocus value={username} required
            onIonChange={e => setUsername(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.password" /></IonLabel>
          <IonInput type="password" value={password} required
            onIonChange={e => setPassword(e.detail.value as string)} />
        </IonItem>
        <IonButton type="submit" color="primary" expand="block" style={{ marginTop: 16 }}
          onClick={() => dispatch(login(username, password))}>
          <Translate id="pages.auth.login" />
        </IonButton>
      </div>
    </>
  );
};

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      {/* <div style={{ marginTop: '30%' }}> */}
      <div>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.name" /></IonLabel>
          <IonInput type="text" autofocus value={name}
            onIonChange={e => setName(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.phone" /></IonLabel>
          <IonInput type="number" autofocus value={phone}
            onIonChange={e => setPhone(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.email" /></IonLabel>
          <IonInput type="text" autofocus value={email}
            onIonChange={e => setEmail(e.detail.value as string)} />
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
        <IonButton type="submit" color="primary" expand="block" style={{ marginTop: 16 }}
          onClick={() => dispatch(register(name, phone, email, password))}>
          <Translate id="pages.auth.signup" />
        </IonButton>
      </div>
    </>
  );
};

export default AuthPage;
