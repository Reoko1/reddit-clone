import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./RegisterModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";
import {
  validEmail,
  validName,
  validPassword,
  validConfirmPassword,
  validRegister
} from "../../utilities/validations";

export const RegisterModal = ({ open, toggleOpen }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const update = fn => e => fn(e.target.value);

  const validate = (fn, ...rest) => e => {
    const { valid, error } = fn(...rest, e.target.value);
    if (!valid) {
      setErrors({ ...errors, ...error });
    } else if (errors[Object.keys(error)[0]]) {
      const prop = Object.keys(error)[0];
      const { [prop]: omit, ...res } = errors;
      setErrors(res);
    }
  };

  const closeModal = () => {
    toggleOpen();
    setErrors({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { valid, errors: registerErrors } = validRegister({
      email,
      name,
      password,
      confirmPassword
    });
    if (!valid) {
      return setErrors(registerErrors);
    }
    console.log("Register request to the server");
  };

  return (
    <Modal open={open} toggleOpen={closeModal}>
      <form className={styles.register__modal} onSubmit={handleSubmit}>
        <FormInput
          label="E-mail"
          type="text"
          value={email}
          onChange={update(setEmail)}
          onBlur={validate(validEmail)}
          error={errors.email}
        />
        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={update(setName)}
          onBlur={validate(validName)}
          error={errors.name}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={update(setPassword)}
          onBlur={validate(validPassword)}
          error={errors.password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={update(setConfirmPassword)}
          onBlur={validate(validConfirmPassword, password)}
          error={errors.confirmPassword}
        />
        <Button type="submit" label="Register" />
      </form>
    </Modal>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};
