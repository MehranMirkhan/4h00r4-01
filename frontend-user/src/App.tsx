import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AppPage } from './declarations';

import Menu from './components/Menu';
import Home from './pages/Home';
// import List from './pages/List';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import { home, settings, logIn } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { store, persistor } from './redux/store_config';


const appPages: AppPage[] = [
  {
    title: 'صفحه اصلی',
    url: '/home',
    icon: home
  },
  {
    title: 'ورود / ثبت‌نام',
    url: '/auth',
    icon: logIn
  },
  {
    title: 'تنظیمات',
    url: '/settings',
    icon: settings,
  },
];

const App: React.FC = () => {
  return (
    <IonApp>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LangHandler>
            <IonReactRouter>
              <IonSplitPane contentId="main">
                <Menu appPages={appPages} />
                <IonRouterOutlet id="main">
                  <Route exact path="/home" component={Home} />
                  <Route path="/auth" component={Auth} />
                  <Route exact path="/settings" component={Settings} />
                  <Route path="/" render={() => <Redirect to="/home" exact />} />
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          </LangHandler>
        </PersistGate>
      </Provider>
    </IonApp>
  );
};

const LangHandler = ({ children }: any) => {
  const settings = useSelector((state: any) => state.settings);
  return <>
    {settings.lang === 'fa' &&
      <link rel="stylesheet" type="text/css" href="rtl.css" />}
    {children}
  </>;
};

export default App;
