import React from "react";
import { Link } from "react-router-dom";
import { FaRedditSquare } from "react-icons/fa";
import styles from "./Header.module.css";
import Button from "../Button";
import LoginModal from "../LoginModal";
import RegisterModal from "../RegisterModal";

export const Header = ({
  loginOpen,
  registerOpen,
  toggleLogin,
  toggleRegister
}) => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <FaRedditSquare className={styles.header__logo} />
      </Link>
      <div className={styles.header__right}>
        <Button label="Sign Up" onClick={toggleRegister} />
        <Button label="Log In" onClick={toggleLogin} />
        <LoginModal open={loginOpen} toggleOpen={toggleLogin} />
        <RegisterModal open={registerOpen} toggleOpen={toggleRegister} />
      </div>
    </div>
  );
};
