import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateContacts } from "../../interfaces";
import { getContactsAction } from "./actions";

const InitialState: IInitialStateContacts = {
  contactsInfo: null,
  loading: true,
  error: undefined,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactsAction.fulfilled, (state, action) => {
        state.contactsInfo = action.payload;
        state.loading = false;
      })
      .addCase(getContactsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export const {} = contactsSlice.actions;

export default contactsSlice.reducer;
