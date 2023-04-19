import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProductsAction = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/products`
      )
      if (!response.ok) {
        console.log("inside try err");
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("inside try err", typeof err);
      throw err;
    }
  }
);
