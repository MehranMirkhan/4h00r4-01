/**
 * State of application's execution (e.g. initialization states)
 */

import { createSlice } from "@reduxjs/toolkit";

import { AppState } from ".";

export type RunState = { storageLoadedOnInit: boolean };

export const initialState: RunState = { storageLoadedOnInit: false };

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {
    storageLoaded(state: RunState) {
      state.storageLoadedOnInit = true;
    }
  }
});

export default runSlice.reducer;
export const { storageLoaded } = runSlice.actions;
export const storageLoadedOninitSelector = (state: AppState) =>
  state.run.storageLoadedOnInit;
