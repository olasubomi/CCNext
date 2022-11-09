import { useRouter } from 'next/router';
import Head from "next/head";
import Meal from '../../src/components/individualPage/Meal';
import GoBack from '../../src/components/CommonComponents/goBack';
import styles from "../../src/components/individualPage/meal.module.css";
import Header, { Header2 } from '../../src/components/Header/Header';
import Sidenav from '../../src/components/Header/sidenav';

const individualMealPage = () => {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Chop Chow Meal Page</title>
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
                <Meal />
            </div>
        </div>
        )
}

export default individualMealPage