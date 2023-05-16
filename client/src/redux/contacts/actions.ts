import { createAsyncThunk } from "@reduxjs/toolkit";

export const getContactsAction = createAsyncThunk(
  "contacts/getAllContactsAction",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/contacts`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);