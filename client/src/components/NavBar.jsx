import React from "react";
import {Outlet, Link} from "react-router-dom";
import '../Style.css';



export default function NavBar(props) {


  return (
    <div>
        <ul id="nav-ul">
        <li id="nav-li"><Link to="/home">Home</Link></li>
        <li id="nav-li"><Link to="/orders">Orders</Link></li>
        <li id="nav-li"><Link to="/quotes">Quotes</Link></li>
        <li id="nav-li"><Link to="/submittals">Submittals</Link></li>
        <li id="nav-li"><Link to="/account">Account</Link></li>
        <li id="nav-li"><Link to="/createProduct">Create Product</Link></li>
        </ul>
      <Outlet/>
    </div>
  )
}