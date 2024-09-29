import React, { useState } from 'react';
import styles from './resetButton.module.css';
//ai generated code :
const ResetButton = ({ src, alt, onClick }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    onClick(); // Call the passed onClick function
    setTimeout(() => setIsSpinning(false), 300); // Adjust delay as needed
  };

  return (
    <img
      src={src}
      alt={alt}
      className={isSpinning ? styles.spinResetButton : styles.resetButton}
      onClick={handleClick}
      style={{ cursor: 'pointer', styles }} // Optional: Set cursor to pointer on hover
    />
  );
};

export default ResetButton;
