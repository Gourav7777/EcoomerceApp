import React from 'react'
import {  Route,  Routes } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
const Routingg = () => {
  return (
    <Routes>
       
    <Route path="/cart" element={<Cart></Cart>} />
    <Route  path="/" element={<Products/>} />
  </Routes>
  )
}

export default Routingg