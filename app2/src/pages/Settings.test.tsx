import React from "react";
import { render, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

import i18n from "src/i18n";
import { Settings } from "./Settings";

describe("<Settings />", () => {
  afterEach(cleanup);
  it("should render", () => {
    const comp = render(
      <I18nextProvider i18n={i18n}>
        <Settings lang="en" setLang={(s: string) => {}} />
      </I18nextProvider>
    );
    expect(comp).toBeDefined();
    expect(comp.getByTestId("so-label").textContent).toBe("Language");
  });
});
