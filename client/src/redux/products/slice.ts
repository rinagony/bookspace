import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";

export const productsSlice = createSlice({
  name: "products",
  initialState: [] as IProduct[],
  reducers: {
    updateProducts: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
