import React, { useEffect } from "react";
import { IonIcon, IonButton } from "@ionic/react";
import { settings, logIn } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Page from "src/widgets/Page";
import Slide from "src/widgets/Slide";
import MultiCol from "src/widgets/MultiCol";
import { LinkButton } from "src/widgets/Buttons";

import api from "src/api";
import useAsync from "src/tools/useAsync";
import { logout } from "src/reducers/auth.reducer";
import config from "src/app.config.json";

import "./Home.css";

export default function() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);

  // News
  const { call, response } = useAsync();
  useEffect(() => {
    call(api.misc.getActiveNews);
  }, [call]);

  return (
    <Page title={t("Welcome to Puzzles")} showBack={false}>
      {!response ? null : (
        <Slide
          images={response.data.map(
            (x: any) => `${config.base_url}/storage/${x.image}`
          )}
        />
      )}

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

      <hr/>
      <span>For Dev:</span>
      <IonButton onClick={() => dispatch(logout())}>Log out</IonButton>
      <p>{JSON.stringify(state)}</p>
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
