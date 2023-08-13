import { useRouter } from 'next/router';
import Head from "next/head";
import Header, { Header2 } from '../../../src/components/Header/Header';
import GoBack from '../../../src/components/CommonComponents/goBack';
import styles from '../../../src/components/grocery/grocery.module.css'
import { AiFillEyeInvisible } from 'react-icons/ai'
import girl from '../../../public/assets/icons/girl.jpg'
import Image from 'next/image';


const GroceryPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Grocery List</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <Header2 />
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.one}>
                    <GoBack />
                    <p className={styles.title3}>My Grocery List </p>
                    <p style={{ marginLeft: '1rem' }}>/ Breakfast</p>
                </div>
                <div className={styles.two3}>
                    <p className={styles.button_text} onClick={() => setShow(!show)}>
                        <AiFillEyeInvisible size={20} style={{ marginRight: '.6rem' }} />
                        Make Public</p>
                </div>
            </div>
            <div className={styles.button_text2}>
                <h4 className={styles.title2}>Breakfast</h4>

                <p className={styles.text} style={{ width: '85%', fontSize: '12px' }}>
                    Everything I need to start my day right.
                    From wholesome cereals and fresh fruits to delightful
                    pastries and energizing beverages, this grocery list
                    has your breakfast essentials covered.
                </p>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '2rem'}}>
                    <Image src={girl} width={40} height={40} className={styles.person} />
                    <p className={styles.text}>Ecuador Victor</p>
                </div>
            </div>
        </div>

        {/* GroceryPage: {id} */}
    </div>
}

export default GroceryPage