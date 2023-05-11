import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateAbout } from "../../interfaces";
import { addReservation, getAboutAction } from "./actions";

const InitialState: IInitialStateAbout = {
  aboutInfo: {
    aboutHeader1: '',
    aboutParagraph1:  '',
    aboutHeader2:  '',
    aboutParagraph2: '',
    aboutHeader3: '',
    aboutParagraph3: '',
    images: [],
    aboutHeader4: ''
  },
  loading: true,
  error: null,
};

export const aboutSlice = createSlice({
  name: "about",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutAction.fulfilled, (state, action) => {
        state.aboutInfo = action.payload;
        state.loading = false;
      })
      .addCase(getAboutAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { } = aboutSlice.actions;

export default aboutSlice.reducer;
