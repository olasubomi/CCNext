import CancelIcon from '@mui/icons-material/Cancel';
import { SentIcon } from '../icons';
import styles from './sent.module.css';


export default function Sent(props){

    return(
        <div className={styles.sent_container}>
            <div className={styles.sent}>
                <div className={styles.sent_top}>
                    <h2></h2>
                    <div onClick={props.toggleSent}>
                    <CancelIcon className={styles.sent_cancel_con} />
                    </div>
                </div>

                <div className={styles.sent_details_con}>
                    <div className={styles.icon_con}>
                        <SentIcon style={styles.sentIcon} />
                    </div>
                    <h3 className={styles.h3}>Sent</h3>
                        <p className={styles.p}>Your request has been sent to the administrator; you will be 
notified when it is approved or rejected.</p>
                </div>

                <div className={styles.sent_footer}>
                    <p className={styles.p}>It might take up to 2-3 hours, so please be patient.</p>
                </div>
            
            </div>
        </div>
    )
}