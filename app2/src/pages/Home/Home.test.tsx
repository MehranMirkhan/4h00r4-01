import React from "react";
import { shallow } from "enzyme";

import Home from ".";

describe("<Home />", () => {
  let home: any;
  beforeEach(() => {
    home = shallow(<Home />);
  });
  it("should render", () => {
    expect(home).toBeDefined();
  });
  it("should match snapshot", () => {
    expect(home).toMatchSnapshot();
  });
});
