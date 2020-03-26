import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";

export type WeeklyState = { data: any[]; fetching: boolean; error: any };

export const initialState: WeeklyState = { data: [], fetching: false, error: undefined };

const weeklySlice = createSlice({
  name: "weekly",
  initialState,
  reducers: {
    fetchWeeklyRequest(state: WeeklyState) {
      state.fetching = true;
    },
    fetchWeeklySuccess(state: WeeklyState, { payload }: PayloadAction<any[]>) {
      state.fetching = false;
      state.data = payload;
      state.error = undefined;
    },
    fetchWeeklyFail(state: WeeklyState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.data = [];
      state.error = payload;
    }
  }
});

export default weeklySlice.reducer;
export const {
  fetchWeeklyRequest,
  fetchWeeklySuccess,
  fetchWeeklyFail
} = weeklySlice.actions;
export const weeklySelector = (state: AppState) => state.weekly.data;
export const weeklyFetchingSelector = (state: AppState) => state.weekly.fetching;
export const weeklyErrorSelector = (state: AppState) => state.weekly.error;
