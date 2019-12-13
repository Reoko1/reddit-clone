import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./LoginModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";
import {
  validName,
  validPassword,
  validLogin
} from "../../utilities/validations";

export const LoginModal = ({ open, toggleOpen }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
    const { valid, errors: loginErrors } = validLogin({
      name,
      password
    });
    if (!valid) {
      return setErrors(loginErrors);
    }
    console.log("Register request to the server");
  };

  return (
    <Modal open={open} toggleOpen={closeModal}>
      <form className={styles.login__modal} onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          type="text"
          onChange={update(setName)}
          value={name}
          onBlur={validate(validName)}
          error={errors.name}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={update(setPassword)}
          value={password}
          onBlur={validate(validPassword)}
          error={errors.password}
        />
        <Button type="submit" label="Log In" />
      </form>
    </Modal>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};
