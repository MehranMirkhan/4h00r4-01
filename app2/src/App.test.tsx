import React from "react";
import { render, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

import i18n from "src/i18n";
import App from "./App";

describe("<App />", () => {
  afterEach(cleanup);
  it("should render", () => {
    const app = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
    expect(app).toBeDefined();
  });
});
