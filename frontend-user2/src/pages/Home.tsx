import React from "react";
import { IonIcon } from "@ionic/react";
import { settings, logIn } from "ionicons/icons";
import { useTranslation } from "react-i18next";

import Page from "src/widgets/Page";
import Slide from "src/widgets/Slide";
import MultiCol from "src/widgets/MultiCol";
import LinkButton from "src/widgets/LinkButton";

import "./Home.css";

export default function() {
  const { t } = useTranslation();
  return (
    <Page title={t("Welcome to Puzzles")} showBack={false}>
      <Slide
        images={[
          "/assets/shapes.svg",
          "/assets/shapes.svg",
          "/assets/shapes.svg"
        ]}
      />

      <MainButton label={t("Level")} to="/level_list" />
      <MainButton label={t("Daily")} to="/question_list?type=daily" />
      <MainButton label={t("Weekly")} to="/question_list?type=weekly" />

      <MultiCol
        cols={[
          <FooterButton icon={settings} to="/settings" />,
          <FooterButton icon={logIn} to="/auth" />,
          <FooterButton icon={settings} to="/settings" />,
          <FooterButton icon={logIn} to="/auth" />
        ]}
      />
    </Page>
  );
}

const MainButton = ({ label, to }: any) => (
  <LinkButton to={to} className="main-button" expand="block" size="large">
    {label}
  </LinkButton>
);

const FooterButton = ({ icon, to }: any) => (
  <LinkButton to={to} size="large">
    <IonIcon icon={icon} />
  </LinkButton>
);
