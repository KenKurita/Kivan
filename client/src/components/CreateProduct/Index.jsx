import React, {useState, useEffect} from "react";
import CategoryList from "./CategoryList.jsx";
import ClickDropDown from './ClickDropDown.jsx';
import CurrentPart from './CurrentPart.jsx';
import ProductName from './ProductName.jsx';
import AddCategoryToPart from './AddCategoryToPart.jsx';
import DropDown from './dropDownManufacture.jsx';
import axios from 'axios';
import './CreateProduct.css';

export default function CreateProductMainPage(props) {

  const [productName, setProductName] = useState('');
  const [fullPartData, setFullPartData] = useState([]);
  const [columnObj, setColumnObj] = useState({});

  // for each column that is added, add to full part#
  function addColumnToPart (input) {
    let x = fullPartData;
    x.push(input)
    setFullPartData(x);
  }

  const [fullPart, setFullPart] = useState([<div key="0" style={{fontSize:"500%"}}>-</div>,<AddCategoryToPart key="00" addColumnToPart={addColumnToPart}/>]);
  const plusSign = <AddCategoryToPart onClick={add}/>

  function add() {
    let fullP = [...fullPart];
    fullP.push(      <div key={ "0" + fullP.length} style={{fontSize:"500%"}}>-</div>, <AddCategoryToPart key={fullP.length} addColumnToPart={addColumnToPart}/>);
    setFullPart(fullP)
  }

  function submit() {
    // console.log('inside Submit', fullPartData)
    axios.post('/database/manufacturer', {fullPartData})
    .then((res) => {
      console.log(res, 'inside axios')
    })
  }

  function addNameToPart(input) {
    let x = fullPartData;
    if (x.length === 0) {
      x.push(input)
    } else {
      x[0] = input;
    }
    setFullPartData(x)
  }



  return (
    <div id="CreateProductMainPage">
      {/* <CategoryList />
      <ClickDropDown/>
      <CurrentPart/> */}
      <div style={{display: "flex", flexWrap:"wrap", width: "75%", border: "2px solid red"}}>
        <DropDown/>
        <ProductName addNameToPart={addNameToPart}/>
        {fullPart}
        <div style={{fontSize:"400%"}} onClick={add}>
          +
        </div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  )
}