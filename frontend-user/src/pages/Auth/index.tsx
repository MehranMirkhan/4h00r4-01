import React from 'react';
import { Route } from 'react-router';
import {
  IonPage, IonHeader, IonToolbar,
  IonButtons, IonMenuButton, IonTitle,
  IonContent, IonBackButton, IonTabs,
  IonTabBar, IonTabButton, IonIcon,
  IonLabel, IonRouterOutlet
} from '@ionic/react';


const AuthPage: React.FC = () => {
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
          <IonTitle>ورود / ثبت نام</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Route path='/auth/:tab(login)' component={Login} exact />
            <Route path='/auth/:tab(signup)' component={Signup} exact />
            {/* <Route path="/" render={() => <Redirect to="/auth/login" />} /> */}
            {/* <Redirect from='/auth' to='/auth/login' /> */}
          </IonRouterOutlet>

          <IonTabBar slot="top">
            <IonTabButton tab="login" href="/auth/login">
              <IonIcon name="login" />
              <IonLabel>login</IonLabel>
            </IonTabButton>

            <IonTabButton tab="signup" href="/auth/signup">
              <IonIcon name="signup" />
              <IonLabel>signup</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonPage>
  );
};

const Login = () => {
  return (
    <>
      <h1>LOG IN</h1>
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
