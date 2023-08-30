import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function AddCategoryToPart (props) {
  const [columnData, setColumnData] = useState([<input {...register('firstName')} />]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function addInput() {
    let data = columnData;
    data.push(<input {...register('firstName')} />)
  }

  function displayInputRows () {
    let mappy = columnData.map((item) => {
      return (
        <>
          {item}
        </>
      )
    })
    return mappy
  }

  function callForm() {

    return (
      <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('firstName')} />
      {displayInputRows}
      <input type="submit" />
    </form>
    )
  }

  return (
    <div>
      {callForm()}
    </div>
  )
}