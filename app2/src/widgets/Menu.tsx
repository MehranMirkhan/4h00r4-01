import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from "@ionic/react";

import { langSelector } from "src/state/settings";
import { AppState } from "src/state";

function Menu({ items, dir }: IMenu) {
  const { t } = useTranslation();
  return (
    <IonMenu
      contentId="main"
      type="overlay"
      side={dir === "rtl" ? "end" : "start"}
    >
      <IonContent>
        {!items ? null : (
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
        )}
      </IonContent>
    </IonMenu>
  );
}

interface IMenu extends RouteComponentProps {
  items?: {
    title: string;
    url: string;
    icon: any;
  }[];
  dir?: "ltr" | "rtl";
}

const props = (state: AppState, ownProps: any) => ({
  ...ownProps,
  dir: langSelector(state) === "fa" ? "rtl" : "ltr"
});

export default connect(props)(withRouter(Menu));
