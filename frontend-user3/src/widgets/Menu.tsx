import React, { useContext } from "react";
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
import { RouteComponentProps, withRouter } from "react-router-dom";

import { storageContext } from "src/providers/StorageProvider";

import "./Menu.css";
import { useTranslation } from "react-i18next";

interface MenuProps extends RouteComponentProps {
  items: {
    title: string;
    url: string;
    icon: any;
  }[];
}

const Menu: React.FC<MenuProps> = ({ items }) => {
  const { storageState } = useContext(storageContext);
  const { t } = useTranslation();
  const { me } = storageState.auth;
  const hasMe = !!me && !!me.phone;
  return (
    <IonMenu
      contentId="main"
      type="overlay"
      side={storageState.settings.lang === "fa" ? "end" : "start"}
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
