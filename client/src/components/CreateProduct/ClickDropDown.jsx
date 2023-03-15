import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './CreateProduct.css';


export default function ClickDropDown(input) {

  const [partList, setPartList] = useState([{partNumber: 'ddd', description: 'tits', price: '34'}]);
  const [partListItem, setPartListItem] = useState('Examle');
  const [partListButton, setPartListButton] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();



  const displayParts = partList.map((item) =>
      <option key={item.partNumber}>{item.partNumber}</option>
    )




  function partListButtonClick() {
    setPartListButton(!partListButton)
  }

  function formSubmit(form) {
    let placeholder = partList;
    placeholder.push(form)
    setPartList(placeholder);
    axios.get(`/database`)
    .then(res => {
      console.log(res, 'inside client still')
    })
    .catch((err) => {
      if (err) {
        return console.log(err, 'error in submitting form to database')
      }
    })
  }



  return (
    <div>
      <select name="parts" id="parts">
        <option>test</option>
        <option>test2</option>
      {displayParts}
      </select>
      <form onSubmit={handleSubmit(formSubmit)}>
        Part#:
        <input  {...register("partNumber")} />
        Description:
        <input {...register("description", { required: true })} />
        Price:
        <input {...register("price", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" value="Add Component"/>
      </form>
    </div>
  )
}