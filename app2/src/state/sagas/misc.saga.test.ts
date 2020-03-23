import { call, put } from "redux-saga/effects";

import api from "src/api";
import { fetchNews } from "./misc.saga";

describe("News saga", () => {
  it("fetching", () => {
    const gen = fetchNews();
    expect(gen.next().value).toEqual(call(api.misc.getActiveNews));
  });
});
