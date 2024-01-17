import React from 'react'

const Loader = () => {
  return (
    <div className="loading-container">
      <div className='loader-content'>
        <div className='loading-image'><img src='../src/assets/Images/loading-white.gif' alt='Loader Image'/></div>
        <h3>Loading...</h3>
        <p className="loading-message">
          Please wait! We are setting up the things. This will only take a moment. Please bear with us.
        </p>
      </div>
    </div>
  )
}

export default Loader
