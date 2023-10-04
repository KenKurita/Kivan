import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import DropDown from './dropDownManufacture.jsx';
import axios from 'axios';

export default function CreateCategory(props) {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const [partNum, setPartNum] = useState([]);
  const [exTable, setExTable] = useState([
    {
      key: '1',
      inputKey: '',
      inputValue: '',
      inputPrice: 0,
      perFt: false,
      quantity: 0
    }
  ]);
  const [manufacturer, setManufacturer] = useState('');

  const onSubmit = data => {
    let newPart = partNum;
    let editing = false;
    const updatedPartNum = partNum.map((category) => {
      if (data['categoryName'] === category['categoryName']) {
        editing = true;
        return data; // Update the matched category
      }
      return category; // Return unchanged for other categories
    });

    setPartNum(updatedPartNum); // Update the state with the updated array

    if (!editing) {
      newPart.push(data)
      setPartNum(newPart)
    }
    // if (partNum.length > 0) {
    //   for (let i = 0; i < partNum.length; i++) {
    //     if (partNum[i]['categoryName'] === data['categoryName']) {
    //       newPart[i] = data;
    //     }
    //   }
    //   newPart.push(data)
    // } else {
    //   newPart.push(data)
    // }
    // setPartNum(newPart)
    let resetTableSize = exTable[0];
    setExTable([resetTableSize])
    reset()
  };

  function addRow() {
    setExTable(prevTable => [
      ...prevTable,
      {
        key: String(prevTable.length + 1),
        inputKey: '',
        inputValue: '',
        inputPrice: 0,
        perFt: false,
        quantity: 0
      }
    ]);
  }


  function removeRow(index) {
    setExTable(prevTable => prevTable.filter((_, i) => i !== index));
  }


  function expandingTable(t) {
    return exTable.map((item, index) => (
      <tr key={item.key}>
        <td><input defaultValue={item.inputKey} {...register(`data.${item.key}.key`)} /></td>
        <td><input defaultValue={item.inputValue} {...register(`data.${item.key}.value`)} /></td>
        <td><input defaultValue={item.inputPrice} {...register(`data.${item.key}.price`)} /></td>
        <td><input type='checkbox' {...register(`data.${item.key}.perFt`)} /></td>
        <td><input defaultValue={item.inputPrice} {...register(`data.${item.key}.quantity`)} /></td>
        <td><button onClick={() => removeRow(index)}>Remove</button></td>
      </tr>
    ));
  }


  function displayColumnData(list) {
    return list.map((l, index) => {
      return (
        <div key={index}>
          <div>Key: {l.key}</div>
          <div>Value: {l.value}</div>
          <div>Price: ${l.price}</div>
          <div>Price Per Ft?{l.perFt}</div>
          <div>Quantity: {l.quantity}</div>
        </div>
      )
    })
  }

  function showColumns (){
    return partNum.map((item, index) => {
      return (<div key={index}><div>Column Name: {item.categoryName}</div><div>{displayColumnData(item.data)}</div> <div><button onClick={() => editColumnData(index)}>Edit</button></div></div>)
    })
  }

  function editColumnData(i) {
    let currentRow = partNum[i];
    // Set initial form values when in edit mode
    setValue(`categoryName`, currentRow.categoryName);
    currentRow.data.forEach((item, index) => {
      setValue(`data.${index}.key`, item.key);
      setValue(`data.${index}.value`, item.value);
      setValue(`data.${index}.price`, item.price);
      setValue(`data.${index}.perFt`, item.perFt);
      setValue(`data.${index}.quantity`, item.quantity);
    });
  }



  function formy(initialData) {
    useEffect(() => {
      if (initialData) {
        // Set initial form values when in edit mode
        Object.keys(initialData).forEach((key) => {
          setValue(`data.${key}.key`, initialData[key].key);
          setValue(`data.${key}.value`, initialData[key].value);
          setValue(`data.${key}.price`, initialData[key].price);
          setValue(`data.${key}.perFt`, initialData[key].perFt);
          setValue(`data.${key}.quantity`, initialData[key].quantity);
        });
      }
    }, [initialData]);

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Category Name:</label>
          <input id='name'  {...register(`categoryName`)} />
          <label htmlFor='lengthCategory'>Length Category?</label>
          <input type='checkbox' id='lengthCategory' {...register(`lengthCategory`)} />
        </div>
        <table>
          <thead>
            <tr>
              <td>Key:</td>
              <td>Value:</td>
              <td>Price:</td>
              <td>Pricing per foot?</td>
              <td>Quantity:</td>
            </tr>
          </thead>
          <tbody>
            {expandingTable()}
          </tbody>
        </table>
        <button type="button" onClick={addRow}>Add Row</button>
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
      </div>
    )
  }

  function submitFullPart() {
    // console.log('inside Submit', fullPartData)
    axios.post('/database/CreateProduct/Submit', {partNum, manufacturer})
    .then((res) => {
      console.log(res, 'inside axios')
    })
  }

  return (
    <div>
      <DropDown manufacturer={manufacturer} setManufacturer={setManufacturer}/>
      <div>{showColumns()}</div>
      {formy()}
      <button onClick={submitFullPart}>Post Full Part</button>
    </div>
  );
}
