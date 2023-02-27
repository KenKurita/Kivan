import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Switch, Link, Outlet } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
<React.StrictMode>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</React.StrictMode>)