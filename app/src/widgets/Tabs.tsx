import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

export default function({ tabs, activeTab, setActiveTab }: ITabs) {
  const { t } = useTranslation();
  return (
    <IonSegment onIonChange={e => setActiveTab(e.detail.value || tabs[0])}>
      {tabs.map((tab: string, index: number) => (
        <IonSegmentButton key={index} value={tab} checked={tab === activeTab}>
          <IonLabel>{t(tab)}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
}
