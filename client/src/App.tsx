import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  About,
  Basket,
  Contacts,
  OurBar,
  NotFound,
  Products,
  SingleProduct,
} from "./components/pages";
import { ThemeProvider } from "styled-components";
import { colors } from "./assets/variables";
import { getAllProductsAction, getProductsFromBasket } from "./redux/products/actions";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  useEffect(() => {
    dispatch(getAllProductsAction());
    dispatch(getProductsFromBasket())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider theme={{ colors }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/our-bar" element={<OurBar />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
