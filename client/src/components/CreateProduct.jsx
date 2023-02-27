import React, {useState, useEffect} from 'react';
import PartCreator from './PartCreator.jsx';
// import $ from 'jquery';


export default function CreateProduct(props) {

  // const [pic, setPic] = useState('some url to basic pic');
  const [blankSpecSheet, setBlankSpecSheet] = useState('');

  // function picClick(src) {
  //   setPic(src)
  // }

  return (
    <div>
      {/* <img id='addPicture' src={pic} value='test' onClick={picClick(value)}></img> */}
      <PartCreator/>
      <button>Add Specification Sheet</button>
      <button>Highlight Specification Sheet</button>
      <button>Complete Fixture</button>
   </div>
  )
}