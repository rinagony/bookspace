import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Asila',
  lastName: 'Krapovina'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action) => {
      state.name = action.payload
    }
  }
})

export const { update } = userSlice.actions

export default userSlice.reducer
