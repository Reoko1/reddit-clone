import React from "react";
import { Link } from "react-router-dom";
import { FaRedditSquare } from "react-icons/fa";
import styles from "./Header.module.css";
import Button from "../Button";
import LoginModal from "../LoginModal";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <FaRedditSquare className={styles.header__logo} />
      </Link>
      <div className={styles.header__right}>
        <Button label="Sign Up" />
        <Button label="Log In" />
        <LoginModal />
      </div>
    </div>
  );
};
