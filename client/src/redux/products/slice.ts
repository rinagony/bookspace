import { createSlice } from '@reduxjs/toolkit'
import {getAllProducts} from './../../api/products'

const initialState = null

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getAllProductsAction: (state) => {
        getAllProducts().then((response) => {
            console.log(response, 'response from  action')
            state = response
        })
    }
  }
})

export const { getAllProductsAction } = productsSlice.actions

export default productsSlice.reducer
