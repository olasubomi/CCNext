import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Header, { Header2 } from "../../src/components/Header/Header";
import GoBack from "../../src/components/CommonComponents/goBack";
import styles from '../../src/components/suggest-store/suggest-store.module.css'
import { useRouter } from "next/router";
import { MdStoreMallDirectory } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";

const SuggestStore = () => {
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const [details, setDetails] = useState({
        title: "",
        isStoreOwner: null
    })
    useEffect(() => {
        if (router.query?.name) {
            setDetails({
                ...details,
                title: router.query.name
            })
        }
    }, [router])

    const handleNext = useCallback(() => {
        setIndex(prev => prev + 1)
    }, [details])
    const handlePrevious = useCallback(() => {
        if (index !== 1) {
            setIndex(prev => prev - 1)
        }
    }, [details])
    return (
        <div className={styles.container}>
            <Head>
                <title>Chop Chow Grocery</title>
                <meta
                    key="title"
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header />
            <Header2 />
            <div className={styles.top}>
                <GoBack />
            </div>
            <div className={styles.pageTitle}>
                <div className={styles.store}>
                    <MdStoreMallDirectory />
                </div>
                <p>Suggest Store</p>
            </div>
            <div className={styles.questionContainer}>
                <div className={styles.flex}>
                    <IoIosPlay color="#F47900" size={20} />
                    <p>Step 1/4</p>
                    {/* First Question */}

                </div>
                <div>
                    {
                        index === 0 && (
                            <>
                                <p className={styles.question}>Are you the store owner({details.title})</p>
                                <div className={styles.flex} style={{ paddingTop: '3rem' }}>
                                    <div className={styles.radio}>
                                        <div className={styles.radioDiv}>
                                            <input onChange={() => setDetails({
                                                ...details, isStoreOwner: true
                                            })} type="radio" />
                                        </div>
                                        <label className={styles.label}>Yes</label>
                                    </div>
                                    <div className={styles.radio}>
                                        <div className={styles.radioDiv}>
                                            <input onChange={() => setDetails({
                                                ...details, isStoreOwner: false
                                            })} type="radio" />
                                        </div>
                                        <label className={styles.label}>No</label>
                                    </div>
                                </div>
                            </>
                        )

                    }
                    {
                        index === 1 && (
                            <>
                                {
                                    details.isStoreOwner ?
                                        <><p className={styles.question}>Would you prefer </p>
                                            <div className={styles.flex} style={{ paddingTop: '3rem' }}>
                                                <div className={styles.radio}>
                                                    <div className={styles.radioDiv}>
                                                        <input onChange={() => setDetails({
                                                            ...details, isStoreOwner: true
                                                        })} type="radio" />
                                                    </div>
                                                    <label className={styles.label}>Yes</label>
                                                </div>
                                                <div className={styles.radio}>
                                                    <div className={styles.radioDiv}>
                                                        <input onChange={() => setDetails({
                                                            ...details, isStoreOwner: false
                                                        })} type="radio" />
                                                    </div>
                                                    <label className={styles.label}>No</label>
                                                </div>
                                            </div></>
                                        : <></>
                                }

                            </>
                        )

                    }
                    <div className={styles.btns}>
                        <button className={styles.outlineBtn} onClick={handlePrevious}>{index === 0 ? 'Close' : 'Back'}</button>
                        <button className={styles.btn} onClick={handleNext}>Next</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default SuggestStore;