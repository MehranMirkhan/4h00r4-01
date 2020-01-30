import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";

import { storageContext } from "src/providers/StorageProvider";

import Page from "src/widgets/Page";
import Tabs from "src/widgets/Tabs";
import { Input } from "src/widgets/FormItems";
import { IonButton } from "@ionic/react";
import { serviceContext } from "src/providers/ServiceProvider";

export default function() {
  const tabs: string[] = ["Login", "Register"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { storageState } = useContext(storageContext);
  const { users: userServices } = useContext(serviceContext);

  const { me } = storageState.auth;
  const hasMe = !!me && !!me.phone;
  if (hasMe) return <Redirect to="/home" exact />;

  return (
    <Page title="Login / Register" showBack={true}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0] ? (
        <Login onLogin={userServices.login} />
      ) : (
        <Register />
      )}
    </Page>
  );
}

const Login = ({ onLogin }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Input
        label="Phone"
        value={username}
        type="number"
        onChange={setUsername}
      />
      <Input
        label="Password"
        value={password}
        type="password"
        onChange={setPassword}
      />
      <SubmitButton
        label="Login"
        onSubmit={() => onLogin(username, password)}
      />
    </>
  );
};

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  return null;
};

const SubmitButton = ({ label, onSubmit }: any) => {
  const { t } = useTranslation();
  return (
    <IonButton type="submit" color="primary" expand="block" onClick={onSubmit}>
      {t(label)}
    </IonButton>
  );
};
