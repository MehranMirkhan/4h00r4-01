import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar,
  IonButtons, IonMenuButton, IonTitle,
  IonContent, IonBackButton, IonCard,
  IonLabel, IonSegment, IonSegmentButton,
  IonCardContent,
  IonInput,
  IonItem,
  IonButton
} from '@ionic/react';
import { Translate } from 'react-localize-redux';


const AuthPage: React.FC = () => {
  const [tab, setTab] = useState("login");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle><Translate id="pages.auth.title" /></IonTitle>
        </IonToolbar>
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
        {tab === "login" ? <Login /> : <Signup />}
      </IonContent>
    </IonPage>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div style={{ marginTop: '30%' }}>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.username" /></IonLabel>
          <IonInput type="number" autofocus value={username}
            onIonChange={e => setUsername(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating"><Translate id="pages.auth.password" /></IonLabel>
          <IonInput type="password" value={password}
            onIonChange={e => setPassword(e.detail.value as string)} />
        </IonItem>
        <IonButton type="submit" color="primary" expand="block" style={{ marginTop: 16 }}>
          <Translate id="pages.auth.login" />
        </IonButton>
      </div>
    </>
  );
};

const Signup = () => {
  return (
    <>
      <h1>SIGN UP</h1>
    </>
  );
};

export default AuthPage;
