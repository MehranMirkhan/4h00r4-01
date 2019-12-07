import {
  IonContent, IonIcon, IonItem,
  IonLabel, IonList, IonMenu,
  IonMenuToggle, IonHeader, IonButton,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppPage } from '../declarations';
import { useSelector, useDispatch } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { getMe, logout } from '../pages/Auth/Auth.reducer';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => {
  const me = useSelector(getMe);
  const hasMe = !!me && Object.keys(me).length > 0;
  const settings = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();
  return (
    <IonMenu contentId="main" type="overlay" side={settings.lang === 'fa' ? "end" : "start"}>
      {hasMe ?
        <IonHeader>
          {/* <IonToolbar color="dark">
          <IonTitle>منو</IonTitle>
        </IonToolbar> */}
          <p>User: {me.name}</p>
          <IonButton type="submit" color="danger" expand="block" style={{ marginTop: 16 }}
            onClick={() => dispatch(logout())}>
            <IonIcon slot="start" name="exit" color="light" />
            <Translate id="pages.auth.logout" />
          </IonButton>
        </IonHeader>
        : null}
      <IonContent>
        <IonList>
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
