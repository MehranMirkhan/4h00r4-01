import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonButton
} from "@ionic/react";
import { contact } from "ionicons/icons";

import "./Menu.css";

interface MenuProps extends RouteComponentProps {
  items: {
    title: string;
    url: string;
    icon: any;
  }[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const {
    auth: { me },
    settings
  } = useSelector((state: State) => state);
  const { t } = useTranslation();
  const hasMe = !!me && !!me.phone;
  return (
    <IonMenu
      contentId="main"
      type="overlay"
      side={settings.lang === "fa" ? "end" : "start"}
    >
      <IonContent>
        {hasMe ? (
          <>
            <div className="center">
              <IonIcon icon={contact} className="avatar" />
              <div>{!!me ? me.name : ""}</div>
            </div>
            <div className="center">
              <IonMenuToggle autoHide={false}>
                <IonButton routerLink="/profile" routerDirection="forward">
                  <IonIcon slot="start" icon={contact} color="light" />
                  {t("Profile")}
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
        ) : null}
        <IonList className="menu-list">
          {items.map((item, index) => {
            if (item.title === "menu.auth" && hasMe) return null;
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
};

export default withRouter(Menu);
