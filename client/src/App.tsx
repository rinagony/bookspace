import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { About, Contacts, MyProfile, NotFound, Products, SingleProduct } from "./components/views";
import { ThemeProvider } from "styled-components";
import { colors } from "./assets/variables";

function App() {
  return (
    <ThemeProvider theme={{ colors }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
