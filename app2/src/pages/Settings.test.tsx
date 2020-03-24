import React from "react";
import { shallow } from "enzyme";

import { Settings } from "./Settings";

describe("<Settings />", () => {
  it("should render", () => {
    const comp = shallow(<Settings />);
    expect(comp).toBeDefined();
    comp.setProps({ lang: null });
    expect(comp).toBeDefined();
    comp.setProps({ lang: [] });
    expect(comp).toBeDefined();
    comp.setProps({ lang: "en" });
    expect(comp).toBeDefined();
  });
  it("should match snapshot", () => {
    const withLangEn = shallow(<Settings lang="en" />);
    expect(withLangEn).toMatchSnapshot();
    const withLangFa = shallow(<Settings lang="fa" />);
    expect(withLangFa).toMatchSnapshot();
  });
});
