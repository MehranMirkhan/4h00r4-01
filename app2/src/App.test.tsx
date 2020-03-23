import React from "react";
import { render } from "enzyme";

import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const app = render(<App />);
    expect(app).toBeDefined();
  });
});
