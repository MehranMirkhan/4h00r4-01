import { take, call, put } from "redux-saga/effects";

import api from "src/api";
import {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFail
} from "src/state/news";

import { fetchNews } from "./news.saga";

describe("News saga", () => {
  const news: News[] = [{ id: 2, img: "/a" }];
  it("Fetching", () => {
    const gen = fetchNews();
    expect(gen.next().value).toEqual(take(fetchNewsRequest.type));
    expect(gen.next().value).toEqual(call(api.misc.getActiveNews));
    expect(gen.next({ data: news }).value).toEqual(put(fetchNewsSuccess(news)));
  });
  it("Fetching fail", () => {
    const gen = fetchNews();
    expect(gen.next().value).toEqual(take(fetchNewsRequest.type));
    expect(gen.next().value).toEqual(call(api.misc.getActiveNews));
    expect(gen.throw("error").value).toEqual(put(fetchNewsFail("error")));
  });
});
