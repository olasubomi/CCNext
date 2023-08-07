import { CloseFillIcon } from "../icons"
import styles from './modal.module.css'

const RejectionModal = () => {
    return(
        <div>
            <div>
                <h5>Reason for Rejection</h5>
                <CloseFillIcon className={styles.icon} />
            </div>
            <div>
                <p>Title</p>
                
            </div>
        </div>
    )
}