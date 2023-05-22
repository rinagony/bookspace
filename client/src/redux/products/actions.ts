import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IProductRatingPost } from "../../interfaces";

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
  async (productSelected: IProduct) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/productsSelected`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productSelected),
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

export const removeProductFromBasket = createAsyncThunk(
  "products/removeProduct",
  async (productSelected: IProduct) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/productsSelected`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productSelected),
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

export const getProductsFromBasket = createAsyncThunk(
  "products/getProductsFromBasket",
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/productsSelected`
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

export const updateProductRating = createAsyncThunk(
  "products/updateProductRating",
  async (productNewRating: IProductRatingPost) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/api/updateRating`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productNewRating),
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