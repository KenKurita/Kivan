import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch, Link, Outlet } from 'react-router-dom';
import SearchProduct from './components/SearchProduct.jsx';
import NavBar from './components/NavBar.jsx';
import CreateProductIndex from './components/CreateProduct/Index.jsx';
import './Style.css';

export default function App() {
  return (
    <div>
    <Outlet/>
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route path="searchProduct" element={<SearchProduct/>}/>
          <Route path="createProduct" element={<CreateProductIndex/>}/>
        </Route>
      </Routes>
    </div>
  )
}