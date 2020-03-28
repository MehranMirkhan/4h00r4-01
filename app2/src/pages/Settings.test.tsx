import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Settings } from "./Settings";

describe("<Settings />", () => {
  afterEach(cleanup);
  it("should render", () => {
    const comp = render(<Settings lang="en" setLang={(s: string) => {}} />);
    expect(comp).toBeDefined();
    expect(comp.getByTestId("so-label").textContent).toBe("Language");
  });
});
