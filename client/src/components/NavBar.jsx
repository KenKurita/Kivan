import React from "react";
import {Outlet, Link} from "react-router-dom";


export default function NavBar(props) {


  return (
    <div>
      <nav className='navigation-bar'>
        <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/quotes">Quotes</Link></li>
        <li><Link to="/submittals">Submittals</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/createProduct">Create Product</Link></li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  )
}