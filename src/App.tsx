import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyProfile, ProductList } from './components/views'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
