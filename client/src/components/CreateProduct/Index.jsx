import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import DropDown from './dropDownManufacture.jsx';
import axios from 'axios';

export default function CreateCategory(props) {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
  const [fixtureName, setFixtureName] = useState('');
  const [subFixtureName, setSubFixtureName] = useState('');
  const [partNum, setPartNum] = useState([]);
  const [exTable, setExTable] = useState([
    {
      key: '1',
      inputKey: '',
      inputValue: '',
      quantity: false,
      asterisks:''
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


  function expandingTable() {
    console.log(' table in render', exTable)
    return exTable.map((item, index) => (
      <tr key={item.key}>
        <td><input defaultValue={item.inputKey} {...register(`data.${item.key}.inputKey`)} /></td>
        <td><input defaultValue={item.inputValue} {...register(`data.${item.key}.inputValue`)} /></td>
        <td><input type='checkbox' defaultChecked={item.quantity} {...register(`data.${item.key}.quantity`)} /></td>
        <td><input defaultValue={item.asterisks} {...register(`data.${item.key}.asterisks`)} /></td>
        <td><button onClick={() => removeRow(index)}>Remove</button></td>
      </tr>
    ));
  }



  function displayColumnData(list) {
    console.log(list, 'list')
    return list.map((l, index) => {
      console.log(l, 'niofrtjh')
      return (
        <div key={index}>
          <div>Key: {l.inputKey}</div>
          <div>Value: {l.inputValue}</div>
          <div>Quantity Dependent?{l.quantity ? 'true': 'false'}</div>
          <div>Asterisks: {l.asterisks}</div>
        </div>
      )
    })
  }

  function showColumns() {
    return partNum.map((item, index) => {
      return (
        <div key={index}>
          <div>Column Name: {item.categoryName}</div>
          <div>{displayColumnData(item.data)}</div>
          <div><button onClick={() => editColumnData(index)}>Edit</button></div>
        </div>
      );
    });
  }


  function editColumnData(i) {
    let currentRow = partNum[i];
    // Set initial form values when in edit mode
    setValue(`categoryName`, currentRow.categoryName);
    currentRow.data.forEach((item, index) => {
      setValue(`data.${index}.key`, item.key);
      setValue(`data.${index}.value`, item.value);
      setValue(`data.${index}.quantity`, item.quantity);
      setValue(`data.${index}.asterisks`, item.asterisks);
    });
  }



  function formy(initialData) {
    useEffect(() => {
      if (initialData) {
        // Set initial form values when in edit mode
        Object.keys(initialData).forEach((key) => {
          setValue(`data.${key}.key`, initialData[key].key);
          setValue(`data.${key}.value`, initialData[key].value);
          setValue(`data.${key}.quantity`, initialData[key].quantity);
          setValue(`data.${key}.asterisks`, initialData[key].asterisks);
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
              <td>Quantity Dependent?</td>
              <td>Asterisk separated by comma</td>
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

  function fixtureNameFunc(e) {
    setFixtureName(e.target.value)
  }

  function subFixtureNameFunc(e) {
    setSubFixtureName(e.target.value)
  }

  function submitFullPart() {
    console.log('inside Submit', partNum)
    axios.post('/database/CreateProduct/Submit', {manufacturer, fixtureName, subFixtureName, partNum})
    .then((res) => {
      console.log(res, 'inside axios')
    })
  }


  return (
    <div>
      <DropDown manufacturer={manufacturer} setManufacturer={setManufacturer}/>
      Fixture Name:<input name='fixtureName' onChange={fixtureNameFunc} value={fixtureName}/><br/>
      additional Fixture Description: <input name='subFixtureName' onChange={subFixtureNameFunc} value={subFixtureName} /><br/>
      <div></div>
      <div>{showColumns()}</div>
      {formy()}
      <button onClick={submitFullPart}>Post Full Part</button>
    </div>
  );
}
