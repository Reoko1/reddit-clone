import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { FaWindowClose } from "react-icons/fa";

export const Modal = ({ children, open, toggleOpen }) =>
  open
    ? createPortal(
        <div className={styles.modal__background}>
          <div className={styles.modal}>
            <div className={styles.modal__header}>
              <FaWindowClose
                className={styles.modal__close}
                onClick={toggleOpen}
              />
            </div>
            <div className={styles.modal__content}>{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};
