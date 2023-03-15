import React from "react";
import CategoryList from "./CategoryList.jsx";
import ClickDropDown from './ClickDropDown.jsx';
import './CreateProduct.css';

export default function CreateProductMainPage(props) {


  return (
    <div id="CreateProductMainPage">
      <CategoryList/>
      <ClickDropDown/>
    </div>
  )
}