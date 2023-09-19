import React from "react";

// Styles
import styles from "./Button.module.css";

const Button = ({ children, color, type, onClick, style, className }) => {
  const customStyles = { ...style };

  if (color) {
    customStyles.backgroundColor = color;
  }

  // if (type === "secondary") {
  //   customStyles.backgroundColor = "var(--inputBackground)";
  //   customStyles.border = "1px solid var(--inputBorder)";
  //   customStyles.color = "var(--color-text)";
  // }

  return (
    <button
      className={`${styles.button} ${type === "secondary" ? styles.secondary : ""} ${className}`}
      style={customStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
