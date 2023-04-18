import React from "react";
import {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import ClickDropDown from './ClickDropDown.jsx';
// import styled from 'styled-components';
import './CreateProduct.css';

export default function ProductName(props) {
  const [fixtureName, setfixtureName] = useState('name?');
  const [categoryList, setCategoryList] = useState([]);
  const [displayAddToList, setDisplayAddToList] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  function formSubmit(form) {
    let placeholder = fixtureName;
    setfixtureName(form['name'])
  }

  return(
    <div style={{display:"flex"}}>
      <div style={{height: "100px", width: "150px", background:"lightGray"}}>
        <div style={{height: "75%", width: "75%", borderBottom: "1px solid #aaa", padding: "6%"}}>
          <div>
            <form onChange={handleSubmit(formSubmit)}>
            <input  value={fixtureName} {...register("name")} />
            {errors.exampleRequired && <span>This field is required</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}