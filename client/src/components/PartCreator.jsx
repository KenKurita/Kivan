import React, {useState, useEffect} from 'react';
import ClickDropDown from './ClickDropDown.jsx';

export default function PartCreator(input) {

  const [fullPart, setFullPart] = useState([]);
  const [part, setPart] = useState({'component': []});


  return (
    <div>
    Add Component
    <label>Add Part Components</label>

    <ClickDropDown/>
    </div>
  )
}