import styles from "./rejection-modal.module.css";
import { IoIosCloseCircle } from "react-icons/io";

export const RejectionModal = ({ setOpenModal }) => (
  <div className={styles.modalContainer}>
    <div className={styles.modal}>
      <div className={styles.header}>
        <p>Reason for rejection</p>
        <div onClick={() => setOpenModal(false)}>
          {" "}
          <IoIosCloseCircle color="#fff" size={30} />
        </div>
      </div>
      <div className={styles.body}>
        <label>Title</label>
        <input />
      </div>
      <div className={styles.body}>
        <label>Add Note</label>
        <textarea type="text" name="" />
      </div>
      <div className={styles.flexend}>
        <button>Add Note</button>
      </div>
    </div>
  </div>
);
