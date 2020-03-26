import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";

export type DailyState = { data: any[]; fetching: boolean; error: any };

export const initialState: DailyState = { data: [], fetching: false, error: undefined };

const dailySlice = createSlice({
  name: "daily",
  initialState,
  reducers: {
    fetchDailyRequest(state: DailyState) {
      state.fetching = true;
    },
    fetchDailySuccess(state: DailyState, { payload }: PayloadAction<any[]>) {
      state.fetching = false;
      state.data = payload;
      state.error = undefined;
    },
    fetchDailyFail(state: DailyState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.data = [];
      state.error = payload;
    }
  }
});

export default dailySlice.reducer;
export const {
  fetchDailyRequest,
  fetchDailySuccess,
  fetchDailyFail
} = dailySlice.actions;
export const dailySelector = (state: AppState) => state.daily.data;
export const dailyFetchingSelector = (state: AppState) => state.daily.fetching;
export const dailyErrorSelector = (state: AppState) => state.daily.error;
