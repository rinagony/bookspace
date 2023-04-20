import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";

export const getAllProductsAction = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/products`
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

export const addProductToBasket = createAsyncThunk(
  "products/addProduct",
  async (productsSelected: IProduct) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/productsSelected`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productsSelected),
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("inside try err", typeof err);
      throw err;
    }
  }
);
