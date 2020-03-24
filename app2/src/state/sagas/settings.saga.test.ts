import { take, call } from "redux-saga/effects";
import i18n from "i18next";

import { setLang } from "src/state/settings";
import { onLangChangeSet_i18n } from "./settings.saga";
import { default_language } from "src/app.config.json";

describe("Settings saga", () => {
  it("on lang change set i18n", () => {
    const gen = onLangChangeSet_i18n();
    expect(gen.next().value).toEqual(take(setLang.type));
    expect(gen.next({ payload: "fr" }).value).toEqual(
      call(i18n.changeLanguage, "fr")
    );
  });
  it("on bad lang change set i18n with default", () => {
    const gen = onLangChangeSet_i18n();
    expect(gen.next().value).toEqual(take(setLang.type));
    expect(gen.next({ payload: 3 }).value).toEqual(
      call(i18n.changeLanguage, default_language)
    );
  });
  it("on bad lang change set i18n with default", () => {
    const gen = onLangChangeSet_i18n();
    expect(gen.next().value).toEqual(take(setLang.type));
    expect(gen.next({ payload: undefined }).value).toEqual(
      call(i18n.changeLanguage, default_language)
    );
  });
});
