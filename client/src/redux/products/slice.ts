import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";
import { getAllProducts } from "../../api/products";

export const productsSlice = createSlice({
  name: "products",
  initialState: [] as IProduct[],
  reducers: {
    updateProducts: (state, action) => {
      return state = action.payload;
    },
    getAllProductsAction: (state) => {
      getAllProducts()
      .then((response) => {
        return state = response;
      })
    }
  },
});

export const { updateProducts, getAllProductsAction } = productsSlice.actions;

export default productsSlice.reducer;
