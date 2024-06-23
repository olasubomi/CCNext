import { useRouter } from 'next/router';
import Head from "next/head";

import Header, {Header2} from '../../src/components/Header/Header';
import GoBack from '../../src/components/CommonComponents/goBack';

import styles from '../../src/components/Checkout/style.module.css'

import Subscription from '../../src/components/Checkout//Subscription';
import Delivery from '../../src/components/Checkout//Delivery';

import Footer from '../../src/components/Footer/Footer'
import ContactInformation from '../../src/components/Checkout/ContactInformation';
import DeliveryAddress from '../../src/components/Checkout/DeliveryAddress';
import PaymentMethod from '../../src/components/Checkout/PaymentMethod';
import OrderSummary from '../../src/components/Checkout/OrderSummary';
import PlaceOrderBtn from '../../src/components/Checkout/PlaceOrderBtn';

const Checkout = () => {
    const router = useRouter()
    const { id } = router.query



    return (
        <div className={styles.container}>
            <Head>
                <title>Chop Chow Checkout</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
            </Head>
            {/* Checkout: {id} */}
            <Header />
            <Header2 />
            <div className={styles.inner_container}>
                <div className ={styles.constraint}>
                    <div className={styles.header}>
                        <GoBack />
                        <b>Checkout</b>
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
                                <OrderSummary />
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