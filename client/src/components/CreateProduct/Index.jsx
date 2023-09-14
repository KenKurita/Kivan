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
      inputPrice: '',
    }
  ]);
  const [manufacturer, setManufacturer] = useState('');

  const onSubmit = data => {
    let newPart = partNum;
    if (partNum.length > 0) {
      for (let i = 0; i < partNum.length; i++) {
        if (partNum[i]['categoryName'] === data['categoryName']) {
          newPart[i] = data;
        } else {
          newPart.push(data)
        }
      }
    } else {
      newPart.push(data)
    }
    setPartNum(newPart)

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
        inputPrice: '',
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
        <td><button onClick={() => removeRow(index)}>Remove</button></td>
      </tr>
    ));
  }


  function displayColumnData (list) {
    return list.map((l, index) => {
       return <div key={index}><div>{l.key}</div><div>{l.value}</div><div>{l.price}</div></div>
    })
  }

  function showColumns (){
    return partNum.map((item, index) => {
      return (<div key={index}><div>{item.categoryName}</div><div>{displayColumnData(item.data)}</div> <div><button onClick={() => editColumnData(index)}>Edit</button></div></div>)
    })
  }

  function editColumnData(i) {
    let currentRow = partNum[i];
    console.log(i, currentRow);

    // Set initial form values when in edit mode
    setValue(`categoryName`, currentRow.categoryName);
    currentRow.data.forEach((item, index) => {
      setValue(`data.${index}.key`, item.key);
      setValue(`data.${index}.value`, item.value);
      setValue(`data.${index}.price`, item.price);
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
        });
      }
    }, [initialData]);
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Category Name:</label>
          <input id='name'  {...register(`categoryName`)} />
        </div>
        <table>
          <thead>
            <tr>
              <td>Key:</td>
              <td>Value:</td>
              <td>Price:</td>
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

  }

  return (
    <div>
      <DropDown manufacturer={manufacturer} setManufacturer={setManufacturer}/>
      <div>{showColumns()}</div>
      {formy()}
    </div>
  );
}
