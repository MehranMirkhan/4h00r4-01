import React, { ReactNode } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

export default ({ cols }: IMultiCol) => (
  <IonGrid>
    <IonRow style={{ textAlign: "center" }}>
      {cols.map((col: ReactNode, i: number) => (
        <IonCol key={i}>{col}</IonCol>
      ))}
    </IonRow>
  </IonGrid>
);

interface IMultiCol {
  cols: ReactNode[];
}
