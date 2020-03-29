import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ionFireEvent } from "@ionic/react-test-utils";

import StateProvider from "src/state";
import AuthPage, { Login, Register } from "./Auth";
import config from "src/app.config.json";

import axios from "jest-mock-axios";

describe("<Auth />", () => {
  const registerResponse = { username: "a", password: "b" };
  const loginResponse = { access_token: "x", refresh_token: "y" };
  afterEach(() => {
    cleanup();
    axios.reset();
  });

  it("should render", () => {
    const comp = render(
      <StateProvider>
        <AuthPage />
      </StateProvider>
    );
    expect(comp).toBeDefined();
  });

  describe("<Login />", () => {
    it("should login", () => {
      const comp = render(
        <StateProvider>
          <AuthPage />
        </StateProvider>
      );
      const phone = comp.getByTestId("login-phone");
      const password = comp.getByTestId("login-password");
      const submit = comp.getByTestId("login-submit");
      ionFireEvent.ionChange(phone, "123456");
      expect(phone.getAttribute("value")).toBe("123456");
      ionFireEvent.ionChange(password, "123456");
      expect(password.getAttribute("value")).toBe("123456");
      ionFireEvent.click(submit);
      expect(axios.post).toBeCalledWith("/login", {
        username: "123456",
        password: "123456"
      });
    });

    it("should not login", () => {
      const onLogin = jest.fn();
      const showError = jest.fn();
      const comp = render(<Login onLogin={onLogin} showError={showError} />);

      const phone = comp.getByTestId("login-phone");
      const password = comp.getByTestId("login-password");
      const submit = comp.getByTestId("login-submit");

      ionFireEvent.click(submit);
      expect(onLogin).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "123456");
      ionFireEvent.click(submit);
      expect(onLogin).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "");
      ionFireEvent.ionChange(password, "123456");
      ionFireEvent.click(submit);
      expect(onLogin).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "abcdef");
      ionFireEvent.click(submit);
      expect(onLogin).not.toBeCalled();
      expect(showError).toBeCalled();
    });
  });

  describe("<Register />", () => {
    it("should register", () => {
      const comp = render(
        <StateProvider>
          <AuthPage />
        </StateProvider>
      );

      const data = {
        phone: "123456",
        password: "123456"
      };

      // Go to register tab
      const tabs = comp.getByTestId("tabs");
      ionFireEvent.ionChange(tabs, "Register");

      const phone = comp.getByTestId("register-phone");
      const password = comp.getByTestId("register-password");
      const passwordConfirm = comp.getByTestId("register-passwordConfirm");
      const submit = comp.getByTestId("register-submit");
      ionFireEvent.ionChange(phone, data.phone);
      expect(phone.getAttribute("value")).toBe(data.phone);
      ionFireEvent.ionChange(password, data.password);
      expect(password.getAttribute("value")).toBe(data.password);
      ionFireEvent.ionChange(passwordConfirm, data.password);
      expect(passwordConfirm.getAttribute("value")).toBe(data.password);
      ionFireEvent.click(submit);

      expect(axios.post).toHaveBeenLastCalledWith("/register", {
        password: config.default_password
      });
      axios.mockResponse({ data: registerResponse });
      expect(axios.post).toHaveBeenLastCalledWith("/login", registerResponse);
      axios.mockResponse({ data: loginResponse });
      expect(axios.get).toHaveBeenLastCalledWith("/v1/me");
      axios.mockResponse({ data: {} });
      expect(axios.patch).toHaveBeenLastCalledWith("/v1/me", {
        email: "",
        name: "",
        phone: data.phone
      });
      axios.mockResponse({ data: {} });
      expect(axios.get).toHaveBeenLastCalledWith("/v1/me");
      axios.mockResponse({ data: {} });
      expect(axios.post).toHaveBeenLastCalledWith("/password", {
        old_password: config.default_password,
        new_password: data.password
      });
    });

    it("should not register", () => {
      const onRegister = jest.fn();
      const showError = jest.fn();
      const comp = render(
        <Register onRegister={onRegister} showError={showError} />
      );

      const phone = comp.getByTestId("register-phone");
      const password = comp.getByTestId("register-password");
      const passwordConfirm = comp.getByTestId("register-passwordConfirm");
      const submit = comp.getByTestId("register-submit");

      ionFireEvent.click(submit);
      expect(onRegister).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "123456");
      ionFireEvent.click(submit);
      expect(onRegister).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "");
      ionFireEvent.ionChange(password, "123456");
      ionFireEvent.click(submit);
      expect(onRegister).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "abcdef");
      ionFireEvent.click(submit);
      expect(onRegister).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "123456");
      ionFireEvent.ionChange(password, "123456");
      ionFireEvent.ionChange(passwordConfirm, "12345");
      ionFireEvent.click(submit);
      expect(onRegister).not.toBeCalled();
      expect(showError).toBeCalled();

      ionFireEvent.ionChange(phone, "abcdef");
      ionFireEvent.ionChange(password, "123456");
      ionFireEvent.ionChange(passwordConfirm, "123456");
      ionFireEvent.click(submit);
      expect(onRegister).not.toBeCalled();
      expect(showError).toBeCalled();
    });
  });
});
