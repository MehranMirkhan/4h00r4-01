import React, { useState, useContext } from "react";
import { IonList, IonButton } from "@ionic/react";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import api from "src/api";
import Page from "src/widgets/Page";
import { Input } from "src/widgets/FormItems";
import { isSuccess } from "src/tools/axiosInstance";
import { alertContext } from "src/providers/AlertProvider";
import { login, getMe } from "src/reducers/auth.reducer";

const PC: React.FC = () => {
  const { t } = useTranslation();
  const showMessage = useContext(alertContext);
  const dispatch = useDispatch();
  const me = useSelector(getMe);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <Page title="Change Password" showBack={true}>
      <IonList>
        <Input
          label="Old Password"
          value={oldPassword}
          type="password"
          onChange={setOldPassword}
        />
        <Input
          label="New Password"
          value={password}
          type="password"
          onChange={setPassword}
        />
        <Input
          label="Confirm password"
          value={passwordConfirm}
          type="password"
          onChange={setPasswordConfirm}
        />
      </IonList>
      <div className="vs24" />
      <div className="center">
        <IonButton
          type="submit"
          color="success"
          onClick={() => {
            if (!password) showMessage("Error", "Password is empty", -1);
            else if (!passwordConfirm)
              showMessage("Error", "Password confirm is wrong", -1);
            else if (password !== passwordConfirm)
              showMessage(
                "Error",
                "Password and password confirm do not match",
                -1
              );
            else
              api.users
                .changePassword(oldPassword, password)
                .then((resp: AxiosResponse) => {
                  if (isSuccess(resp)) {
                    showMessage("", "Password updated", -1);
                    return dispatch(login(me.phone, password));
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

export default PC;
