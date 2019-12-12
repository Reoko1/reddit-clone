import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./RegisterModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";

export const RegisterModal = ({ open, toggleOpen }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const update = fn => e => fn(e.target.value);

  return (
    <Modal open={open} toggleOpen={toggleOpen}>
      <div className={styles.register__modal}>
        <FormInput
          label="E-mail"
          type="text"
          value={email}
          onChange={update(setEmail)}
        />
        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={update(setName)}
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={update(setPassword)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={update(setConfirmPassword)}
        />
        <Button type="submit" label="Register" />
      </div>
    </Modal>
  );
};

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};
