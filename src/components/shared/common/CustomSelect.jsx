import React from 'react'
import Select from 'react-select'

const CustomSelect = ({ options, onChange, value, placeholder }) => {
  const sanitizedValue = value || {}

  return <Select options={options} onChange={onChange} value={sanitizedValue} placeholder={placeholder} />
}

export default CustomSelect
