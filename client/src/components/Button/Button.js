import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

export const Button = ({ type, label, onClick }) => (
  <button type={type} onClick={onClick} className={styles.button}>
    {label}
  </button>
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
