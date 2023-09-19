import Head from "next/head";
import React, { useState, useEffect } from "react";
import Header, { Header2 } from "../../src/components/Header/Header";
import GoBack from "../../src/components/CommonComponents/goBack";
import styles from '../../src/components/public-market/public-market.module.css'
import { HiLocationMarker } from 'react-icons/hi'
import { DropDownSelect } from "../../src/components/select/select";

const PublicMarket = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Chop Chow Grocery</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            <div className={styles.header}>
                <p className={styles.title}>Access stores near you</p>
                <input type="search" name="name" placeholder="Enter Delivery Address" className={styles.searchbar} />
                <HiLocationMarker size={17} className={styles.locationIcon} fill='#949494' />
            </div>
            <div className={styles.header2}>
                <GoBack />
                <div className={styles.two}>
                    <DropDownSelect
                        onSelect={(e) =>  null}
                        options={null}
                         placeholder='All categories' onChange={(e) => null} />
                </div>
            </div>
        </div>
    )
}
export default PublicMarket;