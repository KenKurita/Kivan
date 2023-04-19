import React, {useState, useEffect} from "react";
import CategoryList from "./CategoryList.jsx";
import ClickDropDown from './ClickDropDown.jsx';
import CurrentPart from './CurrentPart.jsx';
import ProductName from './ProductName.jsx';
import AddCategoryToPart from './AddCategoryToPart.jsx';
import axios from 'axios';
import './CreateProduct.css';

export default function CreateProductMainPage(props) {

  const [productName, setProductName] = useState('');
  const [fullPartData, setFullPartData] = useState({});
  const [fullPart, setFullPart] = useState([<AddCategoryToPart key="1" fullPart={fullPart} setFullPart={setFullPart}/>]);
  const plusSign = <AddCategoryToPart onClick={add}/>

  function add() {
     console.log('clicked', fullPart)
    let fullP = [...fullPart];
    fullP.push(<AddCategoryToPart key={fullP.length} fullPartData={fullPartData} setFullPartData={setFullPartData}/>);
    setFullPart(fullP)
  }

  function submit() {
    axios.post('/database/post', {fullPart})
    .then((res) => {
      console.log(res, 'inside axios')
    })
  }

  // useEffect(() => {

  // }, fullPart)



  return (
    <div id="CreateProductMainPage" style={{width: "50%"}}>
      {/* <CategoryList />
      <ClickDropDown/>
      <CurrentPart/> */}
      <div style={{display:"flex"}}>
      <ProductName/>
      {fullPart}
      <div style={{float:"left", width:"100%", fontSize:"400%"}} onClick={add}>
        +
      </div>
      <button>Submit</button>
      </div>
    </div>
  )
}