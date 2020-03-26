import React from "react";
import { render, cleanup } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

import i18n from "src/i18n";
import StateProvider from "src/state";
import { Home } from "./Home";

describe("<Home />", () => {
  afterEach(cleanup);
  it("should render", () => {
    const comp = render(
      <StateProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </StateProvider>
    );
    expect(comp).toBeDefined();
  });
  it("should handle props", () => {
    const comp = render(
      <StateProvider>
        <I18nextProvider i18n={i18n}>
          <Home />
        </I18nextProvider>
      </StateProvider>
    );
    expect(comp.queryAllByTestId("slide-img")).toHaveLength(0);

    comp.rerender(
      <StateProvider>
        <I18nextProvider i18n={i18n}>
          <Home news={[]} />
        </I18nextProvider>
      </StateProvider>
    );
    expect(comp.queryAllByTestId("slide-img")).toHaveLength(0);

    comp.rerender(
      <StateProvider>
        <I18nextProvider i18n={i18n}>
          <Home
            news={[
              { id: 1, img: "/a.svg" },
              { id: 2, img: "/b.svg" }
            ]}
          />
        </I18nextProvider>
      </StateProvider>
    );
    expect(comp.queryAllByTestId("slide-img")).toHaveLength(2);
  });
});
