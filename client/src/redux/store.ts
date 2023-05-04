import {
  AnyAction,
  ThunkAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userSlice from "./user/slice";
import thunk from "redux-thunk";
import productsSlice from "./products/slice";
import { IInitialStateAbout, IInitialStateProducts, IUser } from "../interfaces";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import aboutSlice from "./about/slice";

export interface IRootReducer {
  user: IUser;
  products: IInitialStateProducts;
  about: IInitialStateAbout
}

const rootReducer = combineReducers<IRootReducer>({
  user: userSlice,
  products: productsSlice,
  about: aboutSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
