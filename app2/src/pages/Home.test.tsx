import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Home } from "./Home";

describe("<Home />", () => {
  afterEach(cleanup);
  it("should render", () => {
    const comp = render(<Home />);
    expect(comp).toBeDefined();
  });
  it("should handle props", () => {
    const comp = render(<Home />);
    expect(comp.queryAllByTestId("slide-img")).toHaveLength(0);

    comp.rerender(<Home news={[]} />);
    expect(comp.queryAllByTestId("slide-img")).toHaveLength(0);

    comp.rerender(
      <Home
        news={[
          { id: 1, img: "/a.svg" },
          { id: 2, img: "/b.svg" }
        ]}
      />
    );
    expect(comp.queryAllByTestId("slide-img")).toHaveLength(2);
  });
});
