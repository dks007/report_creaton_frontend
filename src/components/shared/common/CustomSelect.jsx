import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ options, placeholder, value, onChange }) => {
  return <Select options={options} placeholder={placeholder} value={value} onChange={onChange}  />
}

export default CustomSelect
