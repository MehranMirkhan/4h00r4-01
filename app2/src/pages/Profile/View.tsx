import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { IonIcon } from "@ionic/react";
import { person, create, sync, cash } from "ionicons/icons";

import Page from "src/widgets/Page";
import Button from "src/widgets/Button";
import { AppState } from "src/state";
import { authMeSelector } from "src/state/auth";

export function View({ me }: IView) {
  const { t } = useTranslation();
  if (!me) return null;

  const onViewAdClick = () => {
    //   showAd(tapsellConfig.profile_zone_id, {
    //     onError: e => showMessage(`Error occured: ${e}`)
    //   });
  };

  return (
    <Page title={"Profile"} showBack={true}>
      <div>
        <IonIcon icon={person} />
        <div>{me.name}</div>
        <div>
          {t("Phone")}: {me.phone}
        </div>
        <div>
          {t("Email")}: {me.email}
        </div>
        <div>
          {t("Level")}: {me.level}
        </div>
        <div>
          {t("Coin")} 1: {me.coin_1}
        </div>
        <div>
          {t("Coin")} 2: {me.coin_2}
        </div>
        <Button text="Edit" icon={create} link href="/profile/edit" />
        <br />
        <Button text="View Ad" icon={cash} onClick={onViewAdClick} />
        <br />
        <Button
          text="Change Password"
          icon={sync}
          link
          href="/profile/password-change"
          color="danger"
        />
      </div>
    </Page>
  );
}

interface IView {
  me?: Partial<User>;
}

const props = (state: AppState) => ({
  me: authMeSelector(state)
});

export default connect(props)(View);
