import React from "react";
import CategoryList from "./CategoryList.jsx";
import ClickDropDown from './ClickDropDown.jsx';

export default function CreateProductMainPage(props) {


  return (
    <div id="CreateProductMainPage">
      <CategoryList/>
      <ClickDropDown/>
    </div>
  )
}