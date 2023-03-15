import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch, Link, Outlet } from 'react-router-dom';
import Orders from './components/Orders.jsx';
import Quotes from './components/Quotes.jsx';
import Submittals from './components/Submittals.jsx';
import Account from './components/Account.jsx';
import Home from './components/Home.jsx';
import NavBar from './components/NavBar.jsx';
import CreateProductIndex from './components/CreateProduct/CreateProductIndex.jsx';
import './Style.css';

export default function App() {
  return (
    <div>
    <Outlet/>
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="quotes" element={<Quotes/>}/>
          <Route path="submittals" element={<Submittals/>}/>
          <Route path="account" element={<Account/>}/>
          <Route path="createProduct" element={<CreateProductIndex/>}/>
        </Route>
      </Routes>
    </div>
  )
}