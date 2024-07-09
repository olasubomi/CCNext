import React, { useState } from 'react'

import { useRouter } from 'next/router'
import styles from '../../src/components/Checkout/style.module.css'
import GoBack from '../../src/components/CommonComponents/goBack'
import Header, { Header2 } from '../../src/components/Header/Header'
import Head from 'next/head'
import Footer from '../../src/components/Footer/Footer'
import Subscription from '../../src/components/Checkout/Subscription'
import Delivery from '../../src/components/Checkout/Delivery'
import ContactInformation from '../../src/components/Checkout/ContactInformation'
import PaymentMethod from '../../src/components/Checkout/PaymentMethod'
import DeliveryAddress from '../../src/components/Checkout/DeliveryAddress'
import PlaceOrderBtn from '../../src/components/Checkout/PlaceOrderBtn'
import OrderSummary  from '../../src/components/Checkout/OrderSummary'
import { useSelector } from 'react-redux'
const Checkout = () => {
    const router = useRouter()
    const { id } = router.query
    const {cartItems: items} = useSelector((state) => {return state.Cart});
    
    const [tax, setTax] = useState(40);

    const SubTotal = items.reduce((a, c) => a + (c.price * c.amount), 0).toFixed(2)

    const TotalPrice = SubTotal + tax;

    return (
        <div className={styles.container}>
            <Head>
                <title>Chop Chow Checkout</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
            </Head>
            
            <Header />
            <Header2 />
            <div className={styles.inner_container}>
                <div className ={styles.constraint}>
                    <div className={styles.header}>
                        <GoBack />
                        <b>Checkout: {id} </b>
                    </div>
                    <div className={styles.checkout}>
                        <div className={styles.checkout_left}>
                            <Subscription />
                            <Delivery />
                            <ContactInformation />
                            <DeliveryAddress />
                            <PaymentMethod />
                            <div className={styles.show_on_mobile}>
                            <PlaceOrderBtn />
                                </div>
                        </div>
                        <div className={styles.checkout_right}>
                            <div className={styles.sticky}>
                            <OrderSummary items={items} TotalPrice={TotalPrice} SubTotal={SubTotal}/>
                                <div className={styles.hide_on_mobile}>
                                <PlaceOrderBtn />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Checkout