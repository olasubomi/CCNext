import Head from "next/head";
import GroceryComponent from "../src/components/GroceryPage/index";
import Header, { Header2 } from "../src/components/Header/Header";
import GoBack from "../src/components/CommonComponents/goBack";
import styles from '../src/components/grocery/grocery.module.css'
import Image from "next/image";
import noteGif from '../public/assets/icons/gif.gif'
import Footer from "../src/components/Footer/Footer";
import { useState, useEffect } from "react";
import { Modal } from "../src/components/modal/popup-modal";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import girl from "../public/assets/icons/girl.jpg"
import { HiDotsHorizontal } from 'react-icons/hi'


const Grocery = () => {
    const [show, setShow] = useState(false)


    useEffect(() => {
        const doc = document.querySelector('#modal_container')
        console.log(doc)
        disableBodyScroll(doc)
        // if (show) {
        //     disableBodyScroll(doc)
        // } else {
        //     enableBodyScroll(doc)
        // }
    }, [show])
    return (
        <div className={styles.grocery_container} id="modal_container">
            <Head>
                <title>Chop Chow Grocery</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            {/* <GroceryComponent productNames={['prod1', 'prod2']} /> */}
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.one}>
                        <GoBack />
                        <h3 className={styles.title}>My Grocery List</h3>
                    </div>
                    <div className={styles.two}>
                        <p className={styles.button_text} onClick={() => setShow(!show)}>Create New List</p>
                    </div>
                </div>
                {/* <div className={styles.card}>
                    <Image src={noteGif} height={200} width={250} className={styles.image} />
                    <div className={styles.flex}>
                        <p className={styles.card_text}>You have no Grocery List.</p>
                        <div onClick={() => setShow(!show)}>
                            <p className={styles.card_text} style={{ color: '#F47900', marginLeft: '.5rem', cursor: 'pointer' }}>Create New List</p>
                        </div>
                    </div>
                </div> */}
                <div className={styles.card2}>
                    <div className={styles.flex2}>
                        <h4 className={styles.title2}>Breakfast</h4>
                        <p style={{ fontSize: '40px', borderRadius: '50%' }}>
                            <HiDotsHorizontal style={{width: '24px'}} />
                        </p>
                    </div>
                    <p className={styles.text}>
                        Everything I need to start my day right.
                        From wholesome cereals and fresh fruits to delightful
                        pastries and energizing beverages, this grocery list
                        has your breakfast essentials covered.
                    </p>
                    <div className={styles.flex2} style={{ marginTop: '2rem'}}>
                        <div className={styles.flex}>
                            <Image src={girl} width={40} height={40} className={styles.person} />
                            <p className={styles.name}>Ecuador Victor</p>
                        </div>
                        <div className={styles.two2}>
                            <p className={styles.button_text}>Add Items</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                show &&
                <Modal show={show} setShow={setShow} />
            }
            <Footer />
        </div>
    )

}

export default Grocery