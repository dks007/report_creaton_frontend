import React, { useState } from 'react'

const Dropdown = ({ options, onSelect, defaultLabel }) => {
  const [selectedOption, setSelectedOption] = useState(defaultLabel)

  const handleSelect = (option) => {
    setSelectedOption(option)
    onSelect(option)
  }

  return (
    <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
      <option value="">{defaultLabel || 'Select an option'}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
