import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  IonPage, IonHeader,
  IonContent, IonInput,
  IonLabel, IonSegment, IonSegmentButton,
  IonItem, IonButton,
} from '@ionic/react';
import { Translate } from 'react-localize-redux';
import { login, signup, isRegistered } from './Auth.reducer';
import Toolbar from '../../components/Toolbar';
import { AlertContext } from '../../components/AlertController';


const AuthPage: React.FC = () => {
  const [tab, setTab] = useState("login");

  const hasMe = useSelector(isRegistered);
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
      <div>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.phone" /></IonLabel>
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
  const alertContext = useContext(AlertContext);
  const submit = () => {
    if (!phone) alertContext("pages.auth.emptyPhone");
    else if (!password) alertContext("pages.auth.emptyPassword");
    else if (!passwordConfirm) alertContext("pages.auth.emptyPasswordConfirm");
    else if (password !== passwordConfirm) alertContext("pages.auth.passwordConfirmMismatch");
    else dispatch(signup(name, phone, email, password));
  };
  return (
    <>
      <div>
        <IonItem>
          <IonLabel position="floating"><Translate id="user.name" /></IonLabel>
          <IonInput type="text" autofocus value={name}
            onIonChange={e => setName(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="user.phone" /></IonLabel>
          <IonInput type="number" autofocus value={phone} required
            onIonChange={e => setPhone(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="user.email" /></IonLabel>
          <IonInput type="text" autofocus value={email}
            onIonChange={e => setEmail(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.password" /></IonLabel>
          <IonInput type="password" value={password} required
            onIonChange={e => setPassword(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.passwordConfirm" /></IonLabel>
          <IonInput type="password" value={passwordConfirm} required
            onIonChange={e => setPasswordConfirm(e.detail.value as string)} />
        </IonItem>
        <IonButton type="submit" color="primary" expand="block" style={{ marginTop: 16 }}
          onClick={submit}>
          <Translate id="pages.auth.signup" />
        </IonButton>
      </div>
    </>
  );
};

export default AuthPage;
