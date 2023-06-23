import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './CreateProduct.css';

export default function CurrentPart(props) {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  function formSubmit(form) {
    console.log('welp that didnt work)')
    // let placeholder = partList;
    // placeholder.push(form)
    // setPartList(placeholder);
    // axios.get(`/database`)
    // .then(res => {
    //   console.log(res, 'inside client still')
    // })
    // .catch((err) => {
    //   if (err) {
    //     return console.log(err, 'error in submitting form to database')
    //   }
    // })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        Fixture Type
        <input  {...register("name", { required: true })} />
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