import React, { useState, useEffect } from "react";
import axios from 'axios';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  // Fetch options on component mount
  useEffect(() => {
  const getOptions = async () => {
    try {
      const response = await axios.get('/database/CreateProduct/get/manufacturer');
      const data = response.data;
      let dataHold = [];
      for (let i = 0; i < data.length; i++) {
        if (!dataHold.includes(data[i].Tables_in_draft1)) {
          dataHold.push(data[i].Tables_in_draft1)
        }
      }
      setOptions(dataHold);
    } catch (error) {
      console.error(error);
    }
  };

  getOptions();
}, []);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    props.setManufacturer(event.target.value);
  };

  const handleAddOption = async () => {
    if (newOption !== '') {
      try {
        // Make the Axios POST request to your server-side API endpoint
        await axios.post('/database/manufacturer', { option: newOption });
        setOptions(prevOptions => [...prevOptions, newOption]);
        setNewOption('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select a manufacturer</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
      <input
        type="text"
        placeholder="Add Manufacturer"
        value={newOption}
        onChange={(event) => setNewOption(event.target.value)}
      />
      <button onClick={handleAddOption}>Add</button>
      <p>Selected manufacturer: {selectedOption}</p>
    </div>
  );
};

export default Dropdown;
