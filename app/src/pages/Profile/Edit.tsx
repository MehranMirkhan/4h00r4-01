import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AxiosResponse } from "axios";
import { IonButton, IonList } from "@ionic/react";

import api from "src/api";
import { getMe } from "src/reducers/auth.reducer";
import { isSuccess } from "src/tools/axiosInstance";
import { alertContext } from "src/providers/AlertProvider";

import Page from "src/widgets/Page";
import { Input } from "src/widgets/FormItems";

const Edit: React.FC = () => {
  const { t } = useTranslation();
  const showMessage = useContext(alertContext);
  const me = useSelector(getMe);

  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);

  return (
    <Page title={t("Edit")} showBack={true}>
      <IonList>
        <Input
          label="Name"
          type="text"
          value={name}
          placeholder={me.name}
          onChange={setName}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          placeholder={me.email}
          onChange={setEmail}
        />
      </IonList>
      <div className="vs24" />
      <div className="center">
        <IonButton
          type="submit"
          color="success"
          onClick={() => {
            api.users.update({ name, email }).then((resp: AxiosResponse) => {
              if (isSuccess(resp)) {
                showMessage("", "Profile updated", -1);
              }
            });
          }}
        >
          {t("Submit")}
        </IonButton>
      </div>
    </Page>
  );
};

export default Edit;
