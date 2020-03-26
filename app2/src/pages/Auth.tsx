import React, { useState } from "react";
import { connect } from "react-redux";

import Page from "src/widgets/Page";
import Tabs from "src/widgets/Tabs";
import Input from "src/widgets/Input";
import Button from "src/widgets/Button";
import { loginReq, signupReq } from "src/state/auth";
import { setAlert, AlertType } from "src/state/meta";

export function Auth({ onLogin, onRegister, setAlert }: IAuth) {
  const tabs: string[] = ["Login", "Register"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const showError = (e: string) => setAlert(e, "error");
  return (
    <Page title="Login / Register" showBack={true}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === tabs[0] ? (
        <Login onLogin={onLogin} showError={showError} />
      ) : (
        <Register onRegister={onRegister} showError={showError} />
      )}
    </Page>
  );
}

const Login = ({ onLogin, showError }: ILogin) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    if (!username) showError("Phone is empty");
    else if (!password) showError("Password is empty");
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
      <Button text="Login" type="submit" onClick={onSubmit} />
    </>
  );
};

const Register = ({ onRegister, showError }: IRegister) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const onSubmit = () => {
    if (!phone) showError("Phone number is empty");
    else if (!password) showError("Password is empty");
    else if (password.length < 6)
      showError("Password must be more than 5 characters");
    else if (!passwordConfirm) showError("Password confirm is empty");
    else if (password !== passwordConfirm)
      showError("Password and password confirm do not match");
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
        label="Confirm Password"
        value={passwordConfirm}
        type="password"
        onChange={setPasswordConfirm}
      />
      <Button text="Register" type="submit" onClick={onSubmit} />
    </>
  );
};

interface IAuth {
  onLogin: (username: string, password: string) => void;
  onRegister: (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => void;
  setAlert: (alert: string, alertType: AlertType) => void;
}

interface ILogin {
  onLogin: (username: string, password: string) => void;
  showError: (msg: string) => void;
}
interface IRegister {
  onRegister: (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => void;
  showError: (msg: string) => void;
}

const actions = {
  onLogin: loginReq,
  onRegister: signupReq,
  setAlert
};

export default connect(null, actions)(Auth);
