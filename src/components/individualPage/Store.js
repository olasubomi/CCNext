import React from "react";
import styles from "./store.module.css";

import Head from "next/head";
import img_logo from "../../../public/assets/logos/sezzle.png"
import Image from "next/image";
import Reviews from "./Reviews";
import { CallIcon, EmailIcon, LocationIcon, StarIcon, TimeIcon } from "../icons";

function Store(props){

    function handleSearch(e){
        // setSearchSuggestedMealState(e.target.value);
        // if(e.target.value.length>=1){
        //   let url = window.location.href;
        //   let value;
        //   value = { name: e.target.value }
        //   productSuggestion(value).then(res => {
        //     console.log(res)
        //     if(res.data.data.products){
        //       this.setState({
        //         queryResults: res.data.data.products.items
        //       })
        //     }
        //     if(res.data.data.products){
        //       this.setState({
        //         suggestionResults: res.data.data.products.items
        //       })
        //     }
        //   })
        // }
        
      };

    return (
        <>
            <Head>
                <title>Store</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.store_sections}>

                <div className={styles.product_section_2}>
                    <div className={styles.product_section_2_col_1}>
                        <Image
                            src={props.store.profile_picture}
                            alt="pop up"
                            className={styles.product_section_2_main_img}
                            height={500} width={500}
                        />
                    </div>
                    <div className={styles.product_section_2_col_2}>
                        <div className={styles.product_section_2_details}>
                            <h2 className={styles.product_section_2_name}>{props.store.store_name}</h2>
                            <div className={styles.store}>
                                {props.store.supplier_address && 
                                <div>
                                    <LocationIcon style={styles.store_icon} />
                                    <p>{JSON.parse(props.store.supplier_address).address + " " + JSON.parse(props.store.supplier_address).city + " ," + JSON.parse(props.store.supplier_address).state + " " + JSON.parse(props.store.supplier_address).country + " " + JSON.parse(props.store.supplier_address).zip_code}6391 Elgin St. Celina, Delaware 10299</p>
                                </div>}
                                <div>
                                    <EmailIcon style={styles.store_icon} />
                                    <p>{props.store.email}</p>
                                </div>
                                <div>
                                    <CallIcon style={styles.store_icon} />
                                    <p>{props.store.phone_number}</p>
                                </div>
                            </div>
                            <div className={styles.store}>
                                <div>
                                    <TimeIcon style={styles.store_icon} />
                                    <p>Pickup: 8:00 am - 10:00am</p>
                                    {/* <p>{props.store.hours[0]}</p> */}
                                </div>
                            </div>
                            <div className={styles.product_section_2_categories}>
                                <h3 className={styles.product_section_2_category_name}>About Store</h3>
                                <p className={styles.product_section_2_category}>
                                    {props.store.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.products_con}>
                    <div className={styles.productcard_row}>
                        <div className={styles.productcard_col_1}>
                            <h3>Meal</h3>
                        </div>
                        <div className={styles.productcard_col_2}>
                            <div className={styles.productcard_productcards}>
                                {new Array(1,2,3,4,5,6).map((data, index) => {
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
                                {new Array(1,2,3,4,5,6).map((data, index) => {
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