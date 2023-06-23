import React, { useState } from 'react';
import axios from 'axios';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddOption = async () => {
    if (newOption !== '') {
      // Make the Axios POST request to your server-side API endpoint
      setOptions([...options, newOption]);
      setNewOption('');
      try {
        const response = await axios.post('/database/manufacturer', { option: newOption });
        console.log(response.data); // Optional: Log the response data
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