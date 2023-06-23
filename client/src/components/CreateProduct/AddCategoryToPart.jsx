import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function AddCategoryToPart (props) {
  const [columnData, setColumnData] = useState({
    name: 'Category Name?',
    required: false,
  })
  const [categoryBody, setCategoryBody] = useState([]);
  const [buttonAdd, setButtonAdd] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();


  function clickAdd() {
    setButtonAdd(!buttonAdd)
  }

  function nameSubmit(form) {
    let x = columnData;
    x.name = form.name;
    setColumnData(x)
  }



  function bodySubmit(form) {
    let change = categoryBody;
    for (var i = 0; i < change.length; i++) {
      // console.log(change[i][0], form.key)
      if (change[i][0] === form.key) {
        change[i][1] = form.value
      } else {
        change.push([form.key, form.value])
        break;
      }
    }
    if (change.length === 0) {
      change.push([form.key, form.value])
    }
    setCategoryBody(change);
    let x = columnData;
    x[form.key] = form;
    setColumnData(x)
    props.addColumnToPart(x)
  }

  function displayParts(list) {
    if (list) {
      return list.map((item) =>
          <div key={item}>{item[0]} : {item[1]}</div>
      )
    }
  }

  function name() {
    return (
      <div id="categoryName">
        <form onChange={handleSubmit2(nameSubmit)}>
            <input value={columnData.name} {...register2("name", { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
          </form>
      </div>
    )
  }


  function value() {
    return (
    <div id="categoryBody">
      <form onSubmit={handleSubmit(bodySubmit)}>
        Key:
        <input {...register("key", { required: true })} />
        Value:
        <input {...register("value", { required: true })} />
        <input type="checkbox" {...register("priceY")}/>Y
        <input type="checkbox" {...register("priceN")}/>N Price?
        <br/>
        Price: <input {...register("price", {required: false})}/>
        {errors.exampleRequired && <span>This field is required</span>}
        <br/>
        <input type="submit" value="Add Item"/>
      </form>
    </div>
    )
  }

  return (
    <div style={{display:"block"}}>
      <div style={{minHeight: "100px", width: "150px", background:"lightGray"}}>
        <div style={{height: "75%", width: "75%", borderBottom: "1px solid #aaa", padding: "6%"}}>
          {
            <div>
              <div>
                {name()}
              </div>
              <div>
                {displayParts(categoryBody)}
              </div>
            </div>
          }
        </div>
      </div>
        {
            <div>
              <div id="value"  style={{height: "75%", width: "150px"}}>
                {value()}
              </div>
            </div>
        }
    </div>
  )
}