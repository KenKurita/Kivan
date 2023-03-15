import React from "react";
import {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
// import styled from 'styled-components';
import "./../../Style.css";


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


  const mappy = categoryList.map((item) =>
      <div id={item} key={'category-' + item.name}>{item.name}{item.description}</div>
    )

  function boo(input) {
    setDisplayAddToList(!displayAddToList);
  }

  function addItem() {
    <form onSubmit={handleSubmit(formSubmit)}>
        Category Name:
        <input  {...register("name")} />
        Category Description:
        <input {...register("description", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="Create Category"/>
      </form>
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
    // <Wrapper>
    <div id="categroy-list">
      <h2>Part Creator</h2>
      <div>
      {mappy}
      </div> <br/>
      <div>
        Category List
        <button onClick={boo}>Add To List</button>
        <div>{displayAddToList ? addItem: null}</div>
      </div>
    </div>
    // </Wrapper>
  )
}


//css
// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: red;
// `