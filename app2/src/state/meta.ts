/**
 * State of application's execution (e.g. initialization states)
 */

import { createSlice } from "@reduxjs/toolkit";

import { AppState } from ".";

export type MetaState = { storageLoadedOnInit: boolean };

export const initialState: MetaState = { storageLoadedOnInit: false };

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    storageLoaded(state: MetaState) {
      state.storageLoadedOnInit = true;
    }
  }
});

export default metaSlice.reducer;
export const { storageLoaded } = metaSlice.actions;
export const storageLoadedOninitSelector = (state: AppState) =>
  state.meta.storageLoadedOnInit;
