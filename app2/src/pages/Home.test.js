import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";

describe("<Home />", () => {
  it("should render", () => {
    const home = shallow(<Home />);
    expect(home).toBeDefined();
  });
});
