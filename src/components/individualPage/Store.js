import React from "react";
import styles from "./store.module.css";

import Head from "next/head";
import img_logo from "../../../public/assets/logos/sezzle.png"
import Image from "next/image";
import Reviews from "./Reviews";
import { StarIcon } from "../icons";

function Store(props){
    console.log(props.meal)
    return (
        <>
            <Head>
                <title>Store</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.store_sections}>

                <div className={styles.products_con}>
                    <div className={styles.productcard_row}>
                        <div className={styles.productcard_col_1}>
                            <h3>Meal</h3>
                        </div>
                        <div className={styles.productcard_col_2}>
                            <div className={styles.productcard_productcards}>
                                {new Array(1,2,3,4,5,).map((data, index) => {
                                    return(
                                    <div key={index} className={styles.productcard_productcard}>
                                        <div className={styles.productcard_productcard_img_container}>

                                        <Image
                                            priority
                                            src={img_logo}
                                            alt="Store"
                                            className={styles.productcard_productcard_img}
                                        />
                                        </div>
                                        <div className={styles.productcard_productcard_col}>
                                            <h6 className={styles.productcard_productcard_name}>TagIcon</h6>
                                            <p className={styles.productcard_productcard_duration}>
                                                7 min
                                            </p>
                                        </div>
                                        <div className={styles.productcard_productcard_col}>
                                            <div className={styles.store_review_rating_icons}>
                                                {
                                                    Array.from({ length: 5 }).map((i,j) => {
                                                        var rate = 4;
                                                        if((j+1) <= rate){
                                                            return(
                                                                <StarIcon style={styles.store_review_rating_icon} />
                                                            )
                                                        }else{
                                                            return(
                                                                <StarIcon style={styles.store_review_rating_icon2} />
                                                            )}
                                                    })
                                                }
                                            </div>
                                            <p className={styles.productcard_productcard_price}>
                                                $666
                                            </p>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.productcard_row}>
                        <div className={styles.productcard_col_1}>
                            <h3>Products</h3>
                        </div>
                        <div className={styles.productcard_col_2}>
                            <div className={styles.productcard_productcards}>
                                {new Array(1,2,3,4,5,).map((data, index) => {
                                    return(
                                    <div key={index} className={styles.productcard_productcard}>
                                        <div className={styles.productcard_productcard_img_container}>

                                        <Image
                                            priority
                                            src={img_logo}
                                            alt="Store"
                                            className={styles.productcard_productcard_img}
                                        />
                                        </div>
                                        <div className={styles.productcard_productcard_col}>
                                            <h6 className={styles.productcard_productcard_name}>TagIcon</h6>
                                            <p className={styles.productcard_productcard_duration}>
                                                7 min
                                            </p>
                                        </div>
                                        <p>SandraDeli</p>
                                        <div className={styles.productcard_productcard_col}>
                                            <div className={styles.store_review_rating_icons}>
                                                {
                                                    Array.from({ length: 5 }).map((i,j) => {
                                                        var rate = 4;
                                                        if((j+1) <= rate){
                                                            return(
                                                                <StarIcon style={styles.store_review_rating_icon} />
                                                            )
                                                        }else{
                                                            return(
                                                                <StarIcon style={styles.store_review_rating_icon2} />
                                                            )}
                                                    })
                                                }
                                            </div>
                                            <p className={styles.productcard_productcard_price}>
                                                $666
                                            </p>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.store_section_8}>
                    <h3>Add Review</h3>
                    <Reviews />
                </div>
            </div>
        </>
    );
}

export default Store;