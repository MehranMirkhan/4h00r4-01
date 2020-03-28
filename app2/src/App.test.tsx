import React from "react";
import { render, cleanup } from "@testing-library/react";

import App from "./App";

describe("<App />", () => {
  afterEach(cleanup);
  it("should render", () => {
    const app = render(<App />);
    expect(app).toBeDefined();
  });
});
