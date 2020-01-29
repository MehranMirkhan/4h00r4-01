import React, { ReactNode } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

export default ({ cols }: { cols: ReactNode[] }) => {
  return (
    <IonGrid>
      <IonRow style={{ textAlign: "center" }}>
        {cols.map((col: ReactNode, i: number) => (
          <IonCol key={i}>{col}</IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};
