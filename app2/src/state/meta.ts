import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";

export type MetaState = {
  storageLoadedOnInit: boolean;
  alert?: string;
  alertType?: AlertType;
};

export type AlertType = "info" | "error";

export const initialState: MetaState = {
  storageLoadedOnInit: false,
  alert: undefined,
  alertType: undefined
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    storageLoaded(state: MetaState) {
      state.storageLoadedOnInit = true;
    },
    setAlert(
      state: MetaState,
      { payload }: PayloadAction<{ alert: string; alertType: AlertType }>
    ) {
      state.alert = payload.alert;
      state.alertType = payload.alertType;
    },
    clearAlert(state: MetaState) {
      state.alert = undefined;
      state.alertType = undefined;
    }
  }
});

export default metaSlice.reducer;
export const { storageLoaded, setAlert, clearAlert } = metaSlice.actions;
export const storageLoadedOninitSelector = (state: AppState) =>
  state.meta.storageLoadedOnInit;
export const alertSelector = (state: AppState) => ({
  alert: state.meta.alert,
  alertType: state.meta.alertType
});
