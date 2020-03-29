import React, { useState } from "react";
import { connect } from "react-redux";

import Page from "src/widgets/Page";
import Tabs from "src/widgets/Tabs";
import Input from "src/widgets/Input";
import Button from "src/widgets/Button";
import {
  loginReq,
  signupReq,
  SignupRequest,
  LoginRequest
} from "src/state/auth";
import { setAlert, AlertType } from "src/state/meta";

import "src/i18n";

export function Auth({ onLogin, onRegister, setAlert }: IAuth) {
  const tabs: string[] = ["Login", "Register"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const showError = (e: string) => setAlert(e, "error");
  return (
    <Page title="Login / Register" showBack={true}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data-testid="tabs"
      />
      {activeTab === tabs[0] ? (
        <Login onLogin={onLogin} showError={showError} />
      ) : (
        <Register onRegister={onRegister} showError={showError} />
      )}
    </Page>
  );
}

export const Login = ({ onLogin, showError = (_: any) => {} }: ILogin) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    if (!username) showError("Phone is empty");
    else if (isNaN(username as any)) showError("Phone should be a number");
    else if (!password) showError("Password is empty");
    else onLogin({ username, password });
  };
  return (
    <>
      <Input
        label="Phone"
        value={username}
        type="number"
        onChange={setUsername}
        data-testid="login-phone"
      />
      <Input
        label="Password"
        value={password}
        type="password"
        onChange={setPassword}
        data-testid="login-password"
      />
      <Button
        text="Login"
        type="submit"
        onClick={onSubmit}
        data-testid="login-submit"
      />
    </>
  );
};

export const Register = ({
  onRegister,
  showError = (_: any) => {}
}: IRegister) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const onSubmit = () => {
    if (!phone) showError("Phone number is empty");
    else if (isNaN(phone as any)) showError("Phone should be a number");
    else if (!password) showError("Password is empty");
    else if (password.length < 6)
      showError("Password must be more than 5 characters");
    else if (!passwordConfirm) showError("Password confirm is empty");
    else if (password !== passwordConfirm)
      showError("Password and password confirm do not match");
    else onRegister({ name, phone, email, password });
  };
  return (
    <>
      <Input
        label="Name"
        value={name}
        type="text"
        onChange={setName}
        data-testid="register-name"
      />
      <Input
        label="Phone"
        value={phone}
        type="number"
        onChange={setPhone}
        data-testid="register-phone"
      />
      <Input
        label="Email"
        value={email}
        type="email"
        onChange={setEmail}
        data-testid="register-email"
      />
      <Input
        label="Password"
        value={password}
        type="password"
        onChange={setPassword}
        data-testid="register-password"
      />
      <Input
        label="Confirm Password"
        value={passwordConfirm}
        type="password"
        onChange={setPasswordConfirm}
        data-testid="register-passwordConfirm"
      />
      <Button
        text="Register"
        type="submit"
        onClick={onSubmit}
        data-testid="register-submit"
      />
    </>
  );
};

interface IAuth {
  onLogin: (loginRequest: LoginRequest) => void;
  onRegister: (signupRequest: SignupRequest) => void;
  setAlert: (alert: string, alertType: AlertType) => void;
}

interface ILogin {
  onLogin: (loginRequest: LoginRequest) => void;
  showError: (msg: string) => void;
}

interface IRegister {
  onRegister: (signupRequest: SignupRequest) => void;
  showError: (msg: string) => void;
}

const actions = {
  onLogin: loginReq,
  onRegister: signupReq,
  setAlert
};

export default connect(null, actions)(Auth);
