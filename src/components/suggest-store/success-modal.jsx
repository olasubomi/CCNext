import Success from '../../../public/assets/icons/success.gif'
import styles from './suggest-store.module.css'
export const SuccessModal = () => {
    return (
        <div>
            <div>
                <img src={Success} alt='' />
            </div>
            <p>Store Created Successfully</p>
            <p>Congratulations you have successfully created
                a store,To manage your store, click “Manage store”
            </p>
            <div className={styles.flex}>
                <button>Public Market</button>
                <button>Manage Store</button>
            </div>
        </div>
    )
}
