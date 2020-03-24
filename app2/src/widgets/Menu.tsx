import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from "@ionic/react";

function Menu({ items }: IMenu) {
  const { t } = useTranslation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList className="menu-list">
          {items.map((item, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={item.url} routerDirection="none">
                  <IonIcon slot="start" icon={item.icon} />
                  <IonLabel>{t(item.title)}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

interface IMenu extends RouteComponentProps {
  items: {
    title: string;
    url: string;
    icon: any;
  }[];
}

export default withRouter(Menu);
