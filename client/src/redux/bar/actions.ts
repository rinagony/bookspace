import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBarAction = createAsyncThunk(
  "bar/getInfo",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/bar`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
);