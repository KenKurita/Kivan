import React from "react";
import {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
// import styled from 'styled-components';
import './CreateProduct.css';


export default function CategoryList(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [displayAddToList, setDisplayAddToList] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get(`/database/getCategoryList`)
    .then((result) => {
      console.log(result, 'inside useEffect')
      setCategoryList(result.data)
    })
    .catch((err) => {
      if (err) {
        return console.log(err, 'error inside useEffect')
      }
    })
  }, []);


  const mappy = function() {
    let counted = [];
    let remainder = [];
    let remainderArr = categoryList.slice(categoryList.length % 4)
    let loopCount = (categoryList.length - (categoryList.length % 4)) / 4;
    for (var i = 0; i < loopCount; i+=4) {
      counted.push(<tr key={i}><td key={categoryList[i].name}>{categoryList[i].name}</td><td key={categoryList[i+1].name}>{categoryList[i+1].name}</td>
      <td key={categoryList[i+2].name}>{categoryList[i+2].name}</td><td key={categoryList[i+3].name}>{categoryList[i+3].name}</td></tr>)
    }

    for (var i = 0; i < remainderArr.length; i++) {
      remainder.push(<td key={remainderArr[i].name}>{remainderArr[i].name}</td>)
    }
    counted.push(<tr key='remainder'>{remainder}</tr>)
    return counted;
  }

  function boo(input) {
    setDisplayAddToList(!displayAddToList);
  }

  function addItem() {
    <div>
    <form onSubmit={handleSubmit(formSubmit)}>
        Category Name:
        <input  {...register("name")} />
        Category Description:
        <input {...register("description", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="Create Category"/>
      </form>
    </div>
  }

  function formSubmit(form) {
    let placeholder = categoryList;
    placeholder.push(form)
    setCategoryList(placeholder);
    axios.post(`/database/addCategoryList`, {item: form})
    .then(res => {
      console.log(res, 'posted inside db showing from client')
    })
    .catch((err) => {
      if (err) {
        return console.log(err, 'error in submitting category form to database')
      }
    })
  }

  return (
    <div>
      <h2>Part Creator</h2>
      <div id="category-list">
      <table>
        <tbody>
          {mappy()}
        </tbody>
      </table>
      </div>
      <div>
        Category List
        <button onClick={boo}>Add To List</button>
        <div>{displayAddToList ? addItem: null}</div>
      </div>
    </div>

  )
}

