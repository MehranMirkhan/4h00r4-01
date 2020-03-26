import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import { useTranslation } from "react-i18next";

export default function({ tabs, activeTab, setActiveTab }: ITabs) {
  const { t } = useTranslation();
  return (
    <IonSegment
      onIonChange={e => setActiveTab(e.detail.value || tabs[0])}
      value={activeTab}
    >
      {tabs.map((tab: string) => (
        <IonSegmentButton key={tab} value={tab}>
          <IonLabel>{t(tab)}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
}

type ITabs = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (s: string) => void;
};
