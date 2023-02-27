import React, {useState, useEffect} from 'react';


export default function ClickDropDown(input) {

  const [partList, setPartList] = useState([]);
  const [partListItem, setPartListItem] = useState('Examle');
  const [partListButton, setPartListButton] = useState(false);


  function displayPartList() {
    partList.map((item) => {
    <option value={item.toLowerCase()}>item</option>
    })
  }


  function partListButtonClick() {
    setPartListButton(!partListButton)
  }

  function addListItem(input) {
    let placeholder = partList;
    placeholder.push(input)
    setPartList(placeholder);
  }

  function additionalList() {
  }



  return (
    <div>
      <select name="parts" id="parts">
      {displayPartList()}
      </select>
      <form>
          <input type='text'/>
          <input type='submit' value='Add List Item' onClick={addListItem}/>
        </form>
      <button partlistbutton ={"false"} onClick={partListButtonClick}>Add List Item</button>
    </div>
  )
}