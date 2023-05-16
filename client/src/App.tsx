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
import { useAppDispatch } from "./redux/store";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllProductsAction());
    dispatch(getProductsFromBasket());
    AOS.init();
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
