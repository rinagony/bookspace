import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateAbout } from "../../interfaces";
import { addReservation, getAboutAction } from "./actions";

const InitialState: IInitialStateAbout = {
  aboutInfo: null
};

export const aboutSlice = createSlice({
  name: "about",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutAction.fulfilled, (state, action) => {
        state.aboutInfo = action.payload;
      })
  }
});

export const { } = aboutSlice.actions;

export default aboutSlice.reducer;
