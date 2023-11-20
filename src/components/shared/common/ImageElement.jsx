import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ImageElement = ({ src, className, width, height, placeholderSrc }) => {
  const [error, setError] = useState(false)

  /**
   * The function `handleImageError` sets an error state to true.
   */

  const handleImageError = () => {
    setError(true)
  }

  return (
    <>
      {error ? (
        <img src={placeholderSrc || ''} alt="Placeholder" className={className} width={width} height={height} />
      ) : (
        <img src={src} alt={alt} className={className} width={width} height={height} onError={handleImageError} />
      )}
    </>
  )
}

ImageElement.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  placeholderSrc: PropTypes.string
}

export default ImageElement
