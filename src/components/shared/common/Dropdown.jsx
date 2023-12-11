// Dropdown.js

import React, { useState } from 'react';

const Dropdown = ({ options, onSelect, defaultLabel }) => {
  const [selectedOption, setSelectedOption] = useState(defaultLabel);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
      <option value="" disabled>
        {defaultLabel || 'Select an option'}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
