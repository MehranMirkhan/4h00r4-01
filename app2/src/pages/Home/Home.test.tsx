import React from "react";
import { shallow } from "enzyme";

import { Home } from ".";

describe("<Home />", () => {
  it("should render", () => {
    const home = shallow(<Home />);
    expect(home).toBeDefined();
    home.setProps({ news: null });
    expect(home).toBeDefined();
    home.setProps({ news: [] });
    expect(home).toBeDefined();
    home.setProps({ news: [{ id: 1, img: "/a.svg" }] });
    expect(home).toBeDefined();
  });
  it("should match snapshot", () => {
    const homeWithoutNews = shallow(<Home />);
    expect(homeWithoutNews).toMatchSnapshot();
    const homeWithNews = shallow(<Home news={[{ id: 1, img: "/a.svg" }]} />);
    expect(homeWithNews).toMatchSnapshot();
  });
});
