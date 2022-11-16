import { useRouter } from 'next/router';
import Head from "next/head";
import Product from '../../src/components/individualPage/Product';
import styles from "../../src/components/individualPage/meal.module.css";
import GoBack from '../../src/components/CommonComponents/goBack';
import Header, { Header2 } from '../../src/components/Header/Header';
import Sidenav from '../../src/components/Header/sidenav';

const individualProductPage = () => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Chop Chow Product Page</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            <Sidenav />
            <div className={styles.meal_container}>
                <div className={styles.meal_section_1}>
                    <div className={styles.meal_section_1_col_1}>
                        <GoBack />
                    </div>
                    <div className={styles.meal_section_1_col_2}>
                        <p className={styles.meal_section_1_col_2_p}> Choose type</p>
                        <div className={styles.select_container}>
                            <div className={styles.select_box}>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: '95%'}}>
                    <Product />
                </div>
            </div>
            
        </div>
        )
}

export default individualProductPage