import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";
import { default_language } from "src/app.config.json";

export type SettingsState = { lang: string };

export const initialState: SettingsState = { lang: default_language };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLang(state: SettingsState, { payload }: PayloadAction<string>) {
      state.lang = payload;
    },
    resetSettings: (state: SettingsState) => initialState
  }
});

export default settingsSlice.reducer;
export const { setLang, resetSettings } = settingsSlice.actions;
export const langSelector = (state: AppState) => state.settings.lang;
