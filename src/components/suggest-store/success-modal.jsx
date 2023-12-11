import styles from "./suggest-store.module.css";
import { useRouter } from "next/navigation";
export const SuccessModal = () => {
  const router = useRouter();
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.gif}>
          <img src='/assets/icons/success.gif' alt="" />
        </div>
        <p className={styles.successMessage}>Store Created Successfully</p>
        <p className={styles.successText}>
          Congratulations you have successfully created a store,<br />To manage your
          store, click “Manage store”
        </p>
        <div className={styles.flex}>
          <div className={styles.btns}>
            <button className={styles.outlineBtn} onClick={() => router.push('/publicMarket')}>Public Market</button>
            <button className={styles.btn}>Manage Store</button>
          </div>
        </div>
      </div>
    </div>
  );
};
