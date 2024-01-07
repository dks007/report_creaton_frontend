import React, { useState } from 'react'
import Select from 'react-select'

const options = [
  { label: <h1>Hell</h1>, value: 'usa', states: ['New York', 'California', 'Texas'] },
  { label: 'Canada', value: 'canada', states: ['Ontario', 'Quebec', 'British Columbia'] },
  { label: 'India', value: 'india', states: ['U P', 'Bihar', 'Delhi'] },
  { label: 'Pakistan', value: 'pakistan', states: ['Lahore'] },
  { label: 'Nepal', value: 'nepal', states: ['Lasshore', 'sssssssssss'] }
]

const Abc = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption)
    setSelectedState(null)
  }

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption)
  }

  const getStateOptions = () => {
    if (selectedCountry) {
      const country = options.find((opt) => opt.value === selectedCountry.value)
      return country ? country.states.map((state) => ({ label: state, value: state })) : []
    }
    return []
  }

  return (
    <div>
      <h1>Select Country and State</h1>
      <div>
        <label>Country:</label>
        <Select value={selectedCountry} onChange={handleCountryChange} options={options} />
      </div>
      <div>
        <label>State:</label>
        <Select value={selectedState} onChange={handleStateChange} options={getStateOptions()} isDisabled={!selectedCountry} />
      </div>
    </div>
  )
}

export default Abc
