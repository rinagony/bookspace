import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Contacts, MyProfile, Products } from "./components/views";
import { ThemeProvider } from "styled-components";
import { colors } from "./assets/variables";

function App() {
  return (
    <ThemeProvider theme={{ colors }}>
      <BrowserRouter>
        <Routes>
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
