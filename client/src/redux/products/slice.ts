import { createSlice } from "@reduxjs/toolkit";
import { IInitialStateProducts } from "../../interfaces";
import {
  getAllProductsAction,
  getProductsFromBasket,
} from "./actions";

const InitialState: IInitialStateProducts = {
  products: [],
  productsSelected: [],
  loading: true,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState: InitialState,
  reducers: {
    setProductsSelected: (state, action) => {
      state.productsSelected.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getAllProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductsFromBasket.fulfilled, (state, action) => {
        state.productsSelected = action.payload;
      });
  },
});

export const { setProductsSelected } = productsSlice.actions;

export default productsSlice.reducer;
