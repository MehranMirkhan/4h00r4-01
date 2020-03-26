import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from ".";

export type QuestionState = {
  data?: Partial<Question>;
  fetching: boolean;
  error: any;
};

export const initialState: QuestionState = {
  data: undefined,
  fetching: false,
  error: undefined
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    fetchQuestionRequest(
      state: QuestionState,
      { payload }: PayloadAction<number>
    ) {
      state.fetching = true;
    },
    fetchQuestionSuccess(
      state: QuestionState,
      { payload }: PayloadAction<Partial<Question>>
    ) {
      state.fetching = false;
      state.data = payload;
      state.error = undefined;
    },
    fetchQuestionFail(state: QuestionState, { payload }: PayloadAction<any>) {
      state.fetching = false;
      state.data = undefined;
      state.error = payload;
    }
  }
});

export default questionSlice.reducer;
export const {
  fetchQuestionRequest,
  fetchQuestionSuccess,
  fetchQuestionFail
} = questionSlice.actions;
export const questionSelector = (state: AppState) => state.question.data;
export const questionFetchingSelector = (state: AppState) =>
  state.question.fetching;
export const questionErrorSelector = (state: AppState) => state.question.error;
