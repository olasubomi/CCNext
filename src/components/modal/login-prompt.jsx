import styles from "../../components/suggest-store/suggest-store.module.css";
import { useRouter } from "next/navigation";
export const LoginPrompt = ({setShowLoginPrompt}) => {
  const router = useRouter();
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.gif}>
          <img src="/assets/icons/login.svg" alt="" />
        </div>
        <p className={styles.successMessage}>Login to Continue</p>
        <p className={styles.successText}>
          To suggest this item, kindly login to your chopchow account{" "}
        </p>
        <div className={styles.flexCol}>
          {" "}
          <button className={styles.btn} onClick={() => router.push("/login")}>
            Login
          </button>
          <p onClick={() => setShowLoginPrompt(false)}>No, thanks</p>
        </div>
      </div>
    </div>
  );
};
