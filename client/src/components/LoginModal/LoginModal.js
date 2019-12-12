import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./LoginModal.module.css";
import Modal from "../Modal";
import FormInput from "../FormInput";
import Button from "../Button";

export const LoginModal = ({ open, toggleOpen }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const update = fn => e => fn(e.target.value);

  return (
    <Modal open={open} toggleOpen={toggleOpen}>
      <div className={styles.login__modal}>
        <FormInput
          label="Name"
          type="text"
          onChange={update(setName)}
          value={name}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={update(setPassword)}
          value={password}
        />
        <Button label="Log In" />
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};
