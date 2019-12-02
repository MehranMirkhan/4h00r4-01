import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { LocalizeProvider, withLocalize } from "react-localize-redux";
import { AppPage } from './declarations';

import Menu from './components/Menu';
import Home from './pages/Home';
// import List from './pages/List';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import { home, settings, logIn } from 'ionicons/icons';

import { store } from './redux/store_config';
import { setLang } from './pages/Settings/Settings.reducer';
import Storage from './Storage';
import config from './app.config.json';
import globalDictionary from './global.dict.json';

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

/* Fonts */
import './theme/font/fonts.css';


const appPages: AppPage[] = [
  {
    title: 'menu.home',
    url: '/home',
    icon: home
  },
  {
    title: 'menu.auth',
    url: '/auth',
    icon: logIn
  },
  {
    title: 'menu.settings',
    url: '/settings',
    icon: settings,
  },
];

const localizationConfig: any = {
  languages: config.languages,
  translation: globalDictionary,
  options: {
    defaultLanguage: config.defaultLanguage,
    renderToStaticMarkup: false,
  },
};

const App: React.FC = () => {
  return (
    <IonApp>
      <Provider store={store}>
        <LocalizeProvider initialize={localizationConfig}>
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
        </LocalizeProvider>
      </Provider>
    </IonApp>
  );
};

const LangHandler = withLocalize(({ children, activeLanguage, setActiveLanguage }: any) => {
  const settings = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    Storage.get("lang").then((v: any) => {
      if (!v)
        dispatch(setLang("fa"));
      else if (v !== settings.lang)
        dispatch(setLang(v));
    });
    if (activeLanguage.code !== settings.lang)
      setActiveLanguage(settings.lang);
  }, [dispatch, settings.lang, activeLanguage.code, setActiveLanguage]);
  return <>
    {settings.lang === 'fa' &&
      <link rel="stylesheet" type="text/css" href="rtl.css" />}
    {children}
  </>;
});

export default App;
