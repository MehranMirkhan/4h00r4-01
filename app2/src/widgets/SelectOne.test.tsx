import React from "react";
import { shallow } from "enzyme";

import SelectOne from "./SelectOne";

describe("<SelectOne />", () => {
  const options = [
    { value: 1, name: "a" },
    { value: 2, name: "b" },
    { value: 3, name: "c" }
  ];
  it("should render", () => {
    const comp = shallow(
      <SelectOne label="choose" value={2} options={options} />
    );
    expect(comp).toBeDefined();
    const label = comp.find({ "data-test": "so-label" });
    expect(label.text()).toBe("choose");
  });
});
