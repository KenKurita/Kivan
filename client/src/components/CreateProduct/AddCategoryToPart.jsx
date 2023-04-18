import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function AddCategoryToPart (props) {
  const [categoryName, setCategoryName] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [categoryBody, setCategoryBody] = useState([]);
  const [buttonAdd, setButtonAdd] = useState(false)

  function clickAdd() {
    setButtonAdd(!buttonAdd)
  }

  function nameSubmit(form) {
    setCategoryName(form.name);

  }

  function bodySubmit(form) {
    let change = categoryBody;
    change.push(form.description)
    setCategoryBody(change);

  }

  function displayParts(list) {
    if (list) {
      return list.map((item) =>
        <div key={item}>{item}</div>
      )
    }
  }

  function name() {
    return (
      <div id="categoryName">
        <form onSubmit={handleSubmit(nameSubmit)}>
            Category Name:
            <input {...register("name", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" value="Add Name"/>
          </form>
      </div>
    )
  }

  function addToBody() {
    return (
    <div id="categoryBody">
      <form onSubmit={handleSubmit(bodySubmit)}>
        Description:
        <input {...register("description", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="Add Item"/>
      </form>
    </div>
    )
  }

  return (
    <div style={{display:"flex"}}>
      <div style={{fontSize:"500%"}}>
        -
      </div>
      <div style={{height: "100px", width: "150px", background:"lightGray", display:""}}>
        <div style={{height: "75%", width: "75%", borderBottom: "1px solid #aaa", padding: "6%"}}>
          {
            <div>
              <div>
                Category: {categoryName}
              </div>
              <div>
                {displayParts(categoryBody)}
              </div>
            </div>
          }
        </div>
        {
            <div>
              {name()}
              <div id="categoryBody"  style={{float:"right"}}>
                {addToBody()}
              </div>
            </div>
        }
      </div>
    </div>
  )
}