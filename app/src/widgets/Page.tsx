import React, { ReactNode } from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";

import Toolbar from "src/widgets/Toolbar";

interface IPage {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
}

export default function({ children, title, showBack }: IPage) {
  return (
    <IonPage>
      <IonHeader>
        <Toolbar title={title} showBack={showBack} />
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
}
