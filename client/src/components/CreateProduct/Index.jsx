import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import DropDown from './dropDownManufacture.jsx';

export default function CreateCategory(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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
    console.log(data)
    let newPart = partNum;
    newPart.push(data)
    setPartNum(newPart)
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

  function expandingTable() {
    return exTable.map((item, index) => (
      <tr key={item.key}>
        <td><input defaultValue={item.inputKey} {...register(`data.${item.key}.key`)} /></td>
        <td><input defaultValue={item.inputValue} {...register(`data.${item.key}.value`)} /></td>
        <td><input defaultValue={item.inputPrice} {...register(`data.${item.key}.price`)} /></td>
        <td><button onClick={() => removeRow(index)}>Remove</button></td>
      </tr>
    ));
  }

  function showColumns (){
    return partNum.map((item, index) => {
      <>{item}</>
    })
  }

  return (
    <div>
      <DropDown manufacturer={manufacturer} setManufacturer={setManufacturer}/>
      <div>{showColumns()}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='name'>Category Name:</label>
          <input id='name' {...register("categoryName")} />
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
  );
}
