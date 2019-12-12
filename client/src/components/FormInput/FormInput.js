import React from "react";
import PropTypes from "prop-types";
import styles from "./FormInput.module.css";

export const FormInput = ({ label, type, onChange, value }) => (
  <div className={styles.input__container}>
    <label htmlFor="input" className={styles.input__label}>
      {label}
    </label>
    <input
      id="input"
      type={type}
      onChange={onChange}
      value={value}
      className={styles.form__input}
    />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
