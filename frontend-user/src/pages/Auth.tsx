import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { useTranslation } from "react-i18next";
import { IonButton } from "@ionic/react";

import Page from "src/widgets/Page";
import Tabs from "src/widgets/Tabs";
import { Input } from "src/widgets/FormItems";
import { alertContext } from "src/providers/AlertProvider";
import { isRegistered, login, signup } from "src/reducers/auth.reducer";

export default function() {
  const tabs: string[] = ["Login", "Register"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const dispatch = useDispatch();

  const hasMe = useSelector(isRegistered);
  if (hasMe) return <Redirect to="/home" exact />;

  return (
    <Page title="Login / Register" showBack={true}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0] ? (
        <Login
          onLogin={(username: string, password: string) =>
            dispatch(login(username, password))
          }
        />
      ) : (
        <Register
          onRegister={(
            name: string,
            phone: string,
            email: string,
            password: string
          ) => dispatch(signup(name, phone, email, password))}
        />
      )}
    </Page>
  );
}

const Login = ({ onLogin }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showMessage = useContext(alertContext);
  const onSubmit = () => {
    if (!username) showMessage("Error", "Phone is empty", -1);
    else if (!password) showMessage("Error", "Password is empty", -1);
    else onLogin(username, password);
  };
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
      <SubmitButton label="Login" onSubmit={onSubmit} />
    </>
  );
};

const Register = ({ onRegister }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const showMessage = useContext(alertContext);
  const onSubmit = () => {
    if (!phone) showMessage("Error", "Phone number is empty", -1);
    else if (!password) showMessage("Error", "Password is empty", -1);
    else if (!passwordConfirm)
      showMessage("Error", "Password confirm is wrong", -1);
    else if (password !== passwordConfirm)
      showMessage("Error", "Password and password confirm do not match", -1);
    else onRegister(name, phone, email, password);
  };
  return (
    <>
      <Input label="Name" value={name} type="text" onChange={setName} />
      <Input label="Phone" value={phone} type="number" onChange={setPhone} />
      <Input label="Email" value={email} type="email" onChange={setEmail} />
      <Input
        label="Password"
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
      <SubmitButton label="Register" onSubmit={onSubmit} />
    </>
  );
};

const SubmitButton = ({ label, onSubmit }: any) => {
  const { t } = useTranslation();
  return (
    <IonButton type="submit" color="primary" expand="block" onClick={onSubmit}>
      {t(label)}
    </IonButton>
  );
};
