import React from 'react';
import {
  IonContent, IonIcon, IonItem,
  IonLabel, IonList, IonMenu,
  IonMenuToggle, IonButton,
} from '@ionic/react';
import { contact } from 'ionicons/icons';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppPage } from '../declarations';
import { useSelector } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { getMe, isRegistered } from '../pages/Auth/Auth.reducer';

import "./Menu.css";


interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => {
  const me = useSelector(getMe);
  const hasMe = useSelector(isRegistered);
  const settings = useSelector((state: any) => state.settings);
  return (
    <IonMenu contentId="main" type="overlay" side={settings.lang === 'fa' ? "end" : "start"}>
      <IonContent>
        {hasMe ?
          <>
            <div className="center">
              <IonIcon icon={contact} className="avatar" />
              <div>{me.name}</div>
            </div>
            <div className="center">
              <IonMenuToggle autoHide={false}>
                <IonButton routerLink="/profile" routerDirection="forward">
                  <IonIcon slot="start" icon={contact} color="light" />
                  <Translate id="menu.profile" />
                </IonButton>
              </IonMenuToggle>
            </div>
            {/* <div className="center">
              <IonButton type="submit" color="danger"
                onClick={() => dispatch(logout())}>
                <IonIcon slot="start" icon={exit} color="light" />
                <Translate id="menu.logout" />
              </IonButton>
            </div> */}
          </>
          : null
        }
        <IonList className="menu-list">
          {appPages.map((appPage, index) => {
            if (appPage.title === 'menu.auth' && hasMe) return null;
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={appPage.url} routerDirection="none">
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel><Translate id={appPage.title} /></IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default withRouter(Menu);
