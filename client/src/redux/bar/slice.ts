import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateBar } from "../../interfaces";
import { getBarAction } from "./actions";

const InitialState: IInitialStateBar = {
  barInfo: {
    images: [],
    title: "",
    description: "",
    subtitle: "",
    descrition2: [],
    subtitle2: "",
    phone: "",
    email: "",
    menu: []
  },
  loading: true,
  error: undefined,
};

export const barSlice = createSlice({
  name: "bar",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBarAction.fulfilled, (state, action) => {
      state.barInfo = action.payload;
      state.loading = false;
    })
    .addCase(getBarAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },
});

// export const {} = barSlice.actions;

export default barSlice.reducer;
