import React from "react";
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import { About, Contacts, MyProfile, NotFound, Products } from "./components/views";
import { ThemeProvider } from "styled-components";
import { colors } from "./assets/variables";
import { getAllProducts } from "./api/products";

function App() {
  getAllProducts().then((resp: any) => console.log(resp, 'RESP from app'))
  return (
    <ThemeProvider theme={{ colors }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
