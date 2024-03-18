import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageElement = ({
  src,
  className,
  width,
  height,
  placeholderSrc,
  onError,
}) => {
  const [error, setError] = useState(false);

  /**
   * The function `handleImageError` sets an error state to true.
   */

  const handleImageError = () => {
    setError(true);
    onError(true);
  };

  return (
    <>
      {error ? (
        <img
          src={placeholderSrc || ""}
          alt="Image not loaded"
          className={className}
          width={width}
          height={height}
        />
      ) : (
        <img
          src={src}
          alt="Placeholder"
          className={className}
          width={width}
          height={height}
          onError={handleImageError}
        />
      )}
    </>
  );
};

export default ImageElement;
