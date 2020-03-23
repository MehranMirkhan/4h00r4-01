import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";

export type NewsState = { data: any[]; fetching: boolean; error: any };

const initialState: NewsState = { data: [], fetching: false, error: undefined };

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNewsRequest(state: NewsState) {
      state.fetching = true;
    },
    fetchNewsSuccess(state: NewsState, { payload }: PayloadAction<any[]>) {
      state.fetching = false;
      state.data = payload;
      state.error = undefined;
    },
    fetchNewsFail(state: NewsState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.data = [];
      state.error = payload;
    }
  }
});

export default newsSlice.reducer;
export const {
  fetchNewsRequest,
  fetchNewsSuccess,
  fetchNewsFail
} = newsSlice.actions;
export const newsSelector = (state: AppState) => state.news.data;
export const newsLoadingSelector = (state: AppState) => state.news.fetching;
export const newsErrorSelector = (state: AppState) => state.news.error;
