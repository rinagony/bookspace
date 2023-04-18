import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './user/slice'
import thunk from 'redux-thunk';
import productsSlice from './products/slice';
import { IProduct, IUser } from '../interfaces';

interface IRootReducer {
  user: IUser,
  products: IProduct[]
}

const rootReducer = combineReducers<IRootReducer>({
  user: userSlice,
  products: productsSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
