import { useRouter } from 'next/router';
import Head from "next/head";
import Product from '../../src/components/individualPage/Product';
import styles from "../../src/components/individualPage/meal.module.css";

const individualProductPage = () => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Chop Chow Product Page</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
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
                <Product />
            </div>
            
        </div>
        )
}

export default individualProductPage