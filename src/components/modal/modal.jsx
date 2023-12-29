import React from "react";
import styles from '../../components/suggest-store/suggest-store.module.css'
import { IoIosInformationCircle } from "react-icons/io";

export const ModalPopup = ({setOpen}) => (
  <div className={styles.modalContainer}>
    <div className={styles.modal}>
      <IoIosInformationCircle size={40} color="#F47900" />
      <h3 className={styles.successMessage}>Claim this store to proceed</h3>
      <p className={styles.successText2}>
        To secure full access to this store, kindly provide all the necessary
        details needed for ownership verification.
      </p>
      <div className={styles.flex2}>
          <div className={styles.btns}>
            <button
              className={styles.outlineBtn}
              onClick={() => setOpen(false)}
            >
            Close
            </button>
            <button
              className={styles.btn}
            >
              Claim this store
            </button>
          </div>
        </div>
    </div>
  </div>
);
