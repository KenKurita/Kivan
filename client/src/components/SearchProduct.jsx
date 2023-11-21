import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AiOutlineSearch} from 'react-icons/ai';
import { IoRemoveOutline } from "react-icons/io5";

export default function SearchProduct(props) {
  const [fixtureName, setFixtureName] = useState('');
  const [part, setPart] = useState([]);
  const [searchTermValue, setSearchTermValue] = useState('');

  function getPrice(input) {
    axios.get(`/database/get?part=${input}`)
      .then((res) => {
        const newPart =[];
        console.log(res.data, 'inside getPrice')
        setFixtureName(res.data[0]['fixtureName']);
        res.data[0]['fixtureSpec'].forEach((p) => {
          newPart.push(p)
        });
        setPart(newPart);
      })
      .catch((err) => {
        console.log(err, 'error inside getPrice')
      })
  }

  function displayPart() {
    const partMappy = part.map((p,index) => {
      return (
        <td key={index + 1}>
          {displayPartDropdown(p)}
          <IoRemoveOutline />
          <div>{p.columnName}</div>
        </td>
      )
    })
    return (
      <table>
        <tbody>
          <tr>
            <td key='0'>
              <div>{fixtureName}</div>
              <IoRemoveOutline />
              <div>Series</div>
            </td>
            {partMappy}
          </tr>
        </tbody>
      </table>
    )
  }

  function displayPartDropdown(input) {
    console.log('err in displayPartDropdown if no text')
    if (input.length > 1) {
      const dropDownMappy = input['columnGuts'].map((dropDownPart) => {
        console.log(dropDownPart, 'inside displayPartDropdown if blank then no value in drop down')
        return (
          <option value={dropDownPart}>{dropDownPart}</option>
        )
      })
      return (
        <select>
          {dropDownMappy}
        </select>
      )
    } else if (input.length === 1){
      return (
        <div>{input[0]}</div>
      )
    } else {
      return (<div>Error. No part in data</div>)
    }
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTermValue(searchTerm);
  };

  const handleSubmit = (e) => {
    getPrice(searchTermValue)
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      // Call your search function when Enter key is pressed
      handleSubmit();
    }
  };



  return (
    <div>
      <div>Nav bar with a Search Bar
        <span><input type='text' placeholder='search fixture' value={searchTermValue} onChange={handleSearch}
        onKeyPress={handleEnterKey}/></span><AiOutlineSearch onClick={handleSubmit}/></div>
      <div>
        <div>image</div>
        <div>
          <div>
            <div>Fixture Name: </div>
            <div>Fixture Part#</div> {displayPart()}
          </div>
          <div>
            <div>
              <table></table>
              <div>pricing under neath</div>
            </div>
            <div>
              thing that holds the spec sheet and shit
            </div>
          </div>
        </div>
      </div>
      <ul>Rules and Summary List</ul>
    </div>
  )
}