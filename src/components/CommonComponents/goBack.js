import WestIcon from '@mui/icons-material/West';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './common.module.css'

 export default function GoBack(){
    const router = useRouter()

    function goback(){
        router.back()
    }

    return(
            <ul className={styles.goback_header_pages}>
                <div onClick={goback}><WestIcon className={styles.goback_header_page_arrow} /></div>
                <li onClick={goback} className={styles.li}>
                    back
                </li>
            </ul>
    )
}