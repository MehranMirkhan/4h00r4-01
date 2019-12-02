import {
  IonContent, IonIcon, IonItem,
  IonLabel, IonList, IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppPage } from '../declarations';
import { useSelector } from 'react-redux';
import { Translate } from 'react-localize-redux';

interface MenuProps extends RouteComponentProps {
  appPages: AppPage[];
}

const Menu: React.FunctionComponent<MenuProps> = ({ appPages }) => {
  const settings = useSelector((state: any) => state.settings);
  return (
    <IonMenu contentId="main" type="overlay" side={settings.lang === 'fa' ? "end" : "start"}>
      {/* <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>منو</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={appPage.url} routerDirection="none">
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel><Translate id={appPage.title}/></IonLabel>
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
