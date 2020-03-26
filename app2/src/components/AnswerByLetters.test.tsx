import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

import i18n from "src/i18n";
import AnswerByLetters from "./AnswerByLetters";

describe("<AnswerByLetters />", () => {
  afterEach(cleanup);
  const letters = [
    "d",
    "r",
    "t",
    "v",
    "u",
    "s",
    "o",
    "d",
    "p",
    "m",
    "n",
    "a",
    "l",
    "q",
    "y"
  ];
  const letters_num = [6, 5];
  it("should render", () => {
    const onSubmit = jest.fn();
    const comp = render(
      <I18nextProvider i18n={i18n}>
        <AnswerByLetters
          letters={letters}
          letters_num={letters_num}
          isLetterDisabled={(i: number) => false}
          onSubmit={onSubmit}
        />
      </I18nextProvider>
    );
    expect(comp.queryAllByTestId("choosable-letter")).toHaveLength(
      letters.length
    );
    expect(comp.queryAllByTestId("chosen-letter")).toHaveLength(6 + 5);
    fireEvent.click(comp.queryAllByTestId("choosable-letter")[2]);
    fireEvent.click(comp.queryAllByTestId("choosable-letter")[3]);
    fireEvent.click(comp.queryAllByTestId("choosable-letter")[1]);
    expect(comp.queryAllByTestId("chosen-letter")[0].textContent).toBe("t");
    expect(comp.queryAllByTestId("chosen-letter")[1].textContent).toBe("v");
    expect(comp.queryAllByTestId("chosen-letter")[2].textContent).toBe("r");
    fireEvent.click(comp.queryAllByTestId("chosen-letter")[1]);
    expect(comp.queryAllByTestId("chosen-letter")[0].textContent).toBe("t");
    expect(comp.queryAllByTestId("chosen-letter")[1].textContent).toBe("");
    expect(comp.queryAllByTestId("chosen-letter")[2].textContent).toBe("r");
  });
});
