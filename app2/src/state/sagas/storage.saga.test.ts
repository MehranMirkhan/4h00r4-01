import { put } from "redux-saga/effects";

import { AppState, initialState } from "src/state";
import { watchStateChange, loadStorageOnInit } from "./storage.saga";
import { storageLoaded } from "src/state/meta";

describe("Storage saga", () => {
  it("should store on state change", () => {
    const gen = watchStateChange();
    expect(gen.next().value).toHaveProperty("type", "TAKE");
    gen.next();
    let state: AppState = initialState;
    expect(gen.next(state).value).toHaveProperty("type", "TAKE");
    state.meta.storageLoadedOnInit = true;
    state.settings.lang = "fr";
    gen.next();
    expect(gen.next(state).value).toHaveProperty("type", "CALL");
  });
  describe("should load state on app start", () => {
    it("should do nothing if storage is undefiend", () => {
      const gen = loadStorageOnInit();
      expect(gen.next().value).toHaveProperty("type", "CALL");
      expect(gen.next(undefined).value).toEqual(put(storageLoaded()));
    });
    it("should set language if it is in storage", () => {
      const gen = loadStorageOnInit();
      expect(gen.next().value).toHaveProperty("type", "CALL");
      const storage = { settings: { lang: "fr" } };
      expect(gen.next(storage).value).toHaveProperty("type", "PUT");
      expect(gen.next().value).toEqual(put(storageLoaded()));
    });
  });
});
