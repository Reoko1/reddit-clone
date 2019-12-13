import React from "react";
import PropTypes from "prop-types";
import styles from "./FormInput.module.css";

export const FormInput = ({ label, type, onChange, value, onBlur, error }) => (
  <div className={styles.input__container}>
    <label htmlFor={label} className={styles.input__label}>
      {label}
    </label>
    <input
      id={label}
      type={type}
      onChange={onChange}
      value={value}
      className={`${styles.form__input} ${error && styles.error__border}`}
      onBlur={onBlur}
    />
    {error && <span className={styles.input__error}>{error}</span>}
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.string
};
