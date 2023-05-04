import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAboutAction = createAsyncThunk(
  "about/getInfo",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/about`
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