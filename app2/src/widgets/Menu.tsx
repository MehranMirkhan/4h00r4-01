import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from "@ionic/react";

interface MenuProps extends RouteComponentProps {
  items: {
    title: string;
    url: string;
    icon: any;
  }[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList className="menu-list">
          {items.map((item, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={item.url} routerDirection="none">
                  <IonIcon slot="start" icon={item.icon} />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
