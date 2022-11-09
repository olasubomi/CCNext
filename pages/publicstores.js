import styles from '../src/components/publicstore/publicstore.module.css'
import shopImage from "../public/assets/homepage/shop.png";
import Image from 'next/image';
import Header, { Header2 } from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import { ArrowLeftFillIcon } from '../src/components/icons';
import { useState } from 'react';

const PublicStore = () => {
    const [storeSummary, setStoreSummary] = useState(false)

    function showSummary(){
        setStoreSummary(true)
    }

    return (
        <div className={styles.publicstore_container}>
            <Header />
            <Header2 />
            <div className={styles.publicstore_row}>
                <div className={styles.publicstore_col_1}>
                    <h3>Stores</h3>
                </div>
                <div className={styles.publicstore_col_2}>
                    <div className={styles.publicstore_storecards}>
                        {new Array(1,2,3,4,5).map((data, index) => {
                            return(
                            <div onClick={showSummary} key={index} className={styles.publicstore_storecard}>
                                <div className={styles.publicstore_storecard_img_container}>

                                <Image
                                    priority
                                    src={shopImage}
                                    alt="Store"
                                    className={styles.publicstore_storecard_img}
                                />
                                </div>
                                <div className={styles.publicstore_storecard_col}>
                                    <h6 className={styles.publicstore_storecard_name}>drtytdyt</h6>
                                </div>
                                <p>Ghana</p>
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className={styles.publicstore_col_3}>
                    
                    {!storeSummary ?
                    <h5>View More</h5>:
                    <div className={styles.publicstore_store_summary_con}>
                        <div className={styles.publicstore_store_summary_col_1}>
                            <p>You are responsible for operations, service, or customer support and face challenges trying to communicate complex procedures to a global market effectively. Traditional methods don’t work and are laborious, costly and error prone.</p>
                        </div>
                        <div className={styles.publicstore_store_summary_col_2}>
                            <div className={styles.publicstore_store_summary_arrow_icon}>
                                <ArrowLeftFillIcon style={styles.publicstore_store_summary_arrow_icon} />
                            </div>
                            <div className={styles.publicstore_store_summary_list}>
                                <div className={styles.publicstore_storecard_summary}>
                                    <div className={styles.publicstore_storecard_summary_img_container}>

                                    <Image
                                        priority
                                        src={shopImage}
                                        alt="Store"
                                        className={styles.publicstore_storecard_summary_img}
                                    />
                                    </div>
                                    <div className={styles.publicstore_storecard_summary_col}>
                                        <h6 className={styles.publicstore_storecard_summary_name}>drtytdyt</h6>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.publicstore_store_summary_arrow_icon}>
                                <ArrowLeftFillIcon style={styles.publicstore_store_summary_arrow_icon} />
                            </div>
                        </div>
                        <div className={styles.publicstore_store_summary_col_3}>
                            <button>View Store</button>
                        </div>
                    </div>}
                </div>
            </div>

            <div className={styles.publicstore_row}>
                <div className={styles.publicstore_col_1}>
                    <h3>Popular Meals</h3>
                </div>
                <div className={styles.publicstore_col_2}>
                    <div className={styles.publicstore_productcards}>
                        {new Array(1,2,3,4,5,6,7,8).map((data, index) => {
                            return(
                            <div key={index} className={styles.publicstore_productcard}>
                                <div className={styles.publicstore_productcard_img_container}>

                                <Image
                                    priority
                                    src={shopImage}
                                    alt="Store"
                                    className={styles.publicstore_productcard_img}
                                />
                                </div>
                                <div className={styles.publicstore_productcard_col}>
                                    <h6 className={styles.publicstore_productcard_name}>drtytdyt</h6>
                                    <p className={styles.publicstore_productcard_price}>
                                        66666
                                    </p>
                                </div>
                                <p>Ghana</p>
                                <div className={styles.publicstore_productcard_col}>
                                    <h6 className={styles.publicstore_productcard_name}>drtytdyt</h6>
                                    <p className={styles.publicstore_productcard_duration}>
                                        66666
                                    </p>
                                </div>
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className={styles.publicstore_col_3}>
                    <h5>View More</h5>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PublicStore