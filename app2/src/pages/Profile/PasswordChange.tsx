import React, { useState } from "react";
import { connect } from "react-redux";
import { IonList } from "@ionic/react";

import Page from "src/widgets/Page";
import Input from "src/widgets/Input";
import Button from "src/widgets/Button";
import { passwordChangeReq } from "src/state/auth";

export function PC({ onSubmit }: IPC) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <Page title={"Change Password"} showBack={true}>
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
          label="Confirm New Password"
          value={passwordConfirm}
          type="password"
          onChange={setPasswordConfirm}
        />
      </IonList>
      <Button
        text="Submit"
        type="submit"
        color="success"
        onClick={() => onSubmit(oldPassword, password)}
      />
    </Page>
  );
}

interface IPC {
  onSubmit: (oldPassword: string, newPassword: string) => void;
}

const actions = {
  onSubmit: (oldPassword: string, newPassword: string) =>
    passwordChangeReq({ oldPassword, newPassword })
};

export default connect(null, actions)(PC);
