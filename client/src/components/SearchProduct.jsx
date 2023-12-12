import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AiOutlineSearch} from 'react-icons/ai';
import { IoRemoveOutline } from "react-icons/io5";

export default function SearchProduct(props) {
  const [fixtureName, setFixtureName] = useState('');
  const [length, setLength] = useState(0);
  const [part, setPart] = useState([]);
  const [selectedPart, setSelectedPart] = useState([]);
  const [searchTermValue, setSearchTermValue] = useState('');

  function getPart(input) {
    axios.get(`/database/get?part=${input}`)
      .then((res) => {
        const newPart =[];
        const newSelectedPartSkeleton = [];
        setFixtureName(res.data[0]['fixtureName']);
        res.data[0]['fixtureSpec'].forEach((p) => {
          newSelectedPartSkeleton.push({columnName: p.columnName, optionSelected: null, lengthColumn: p.columnLength})
          newPart.push(p)
        });

        // pulling part and setting it to state to reference for rendingering
        setPart(newPart);
        // creating part skeleton to get price with completed part #
        setSelectedPart(newSelectedPartSkeleton);
      })
      .catch((err) => {
        console.log(err, 'error inside getPart')
      })
  }

  function displayPart() {
    const partMappy = part.map((p,index) => {
      if (p.columnName === 'Length' || p.columnName === 'length') {
        return(
          <td key={index + 1}>
            <div>Enter Length:</div>
             <input onChange={handleLengthInput}></input>
          </td>
        )
      } else {
        return (
          <td key={index + 1}>
            {displayPartDropdown(p)}
            <IoRemoveOutline />
            <div>{p.columnName}</div>
          </td>
        )
      }
    })
    return (
      <div>
      <table>
        <tbody>
          <tr>
            <td key='0'>
              <div>{fixtureName}</div>
              <IoRemoveOutline />
            </td>
            {partMappy}
          </tr>
        </tbody>
      </table>
      <button onClick={getPrice}>Get Price</button>
      </div>
    )
  }

  function displayPartDropdown(input) {
    if (input['columnGuts'].length > 1) {
      const dropDownMappy = input['columnGuts'].map((dropDownPart, index) => {
        return (
          <option key={index} value={dropDownPart.key}>{dropDownPart.key} - {dropDownPart.description}</option>
        )
      })
      return (
        <select value=''>
          <option></option>
          {dropDownMappy}
        </select>
      )
    } else if (input['columnGuts'].length === 1){
      return (
        <div>{input['columnGuts'][0].key} - {input['columnGuts'][0].description}</div>
      )
    } else {
      return (<div>Error. No part in data</div>)
    }
  }

  // Pricing function in SQL database
  const getPrice = () => {
    console.log(part, 'getPrice')
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTermValue(searchTerm);
  };

  const handleSubmit = (e) => {
    getPart(searchTermValue)
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      // Call your search function when Enter key is pressed
      handleSubmit();
    }
  };

  const handleLengthInput = (event) => {
    // console.log(event.target.value, 'handleLengthInput');
    setLength(event.target.value);
    const changingPartLength = selectedPart;
    changingPartLength.forEach((column) => {
      if (column.lengthColumn) {
        column.optionSelected = event.target.value
      }
    });
    setSelectedPart(changingPartLength);
  }

  const handleOptionSelectPart = (event) => {
    console.log(event.target.value, 'handleOptionSelectedPart')
  }



  return (
    <div>
      <div>Nav bar with a Search Bar
        <span><input type='text' placeholder='search fixture' value={searchTermValue} onChange={handleSearch}
        onKeyPress={handleEnterKey}/></span><AiOutlineSearch onClick={handleSubmit}/></div>
      <div>
        <div>image</div>
        <div>
          <div>
            <div>Fixture Name: </div> {fixtureName}
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