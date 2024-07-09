import Head from "next/head";
import Header, { Header2 } from '../../src/components/Header/Header'
import GoBack from '../../src/components/CommonComponents/goBack';
import styles from '../../src/components/grocery/grocery.module.css'
import { BiSolidInfoCircle } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Modal } from '../../src/components/modal/popup-modal';
import Footer from '../../src/components/Footer/Footer';
import { IoMdCloseCircle } from 'react-icons/io'
import axios from '../../src/util/Api';
import { toast } from 'react-toastify';
import { SugMeals } from '../../src/sug-meals';
import { useCart } from "../../src/context/cart.context";
import Popup from "reactjs-popup";
import Cart from "../../src/components/Cart/Index";


const CartPage = () => {
    
    return <div>
        <Head>
            <title>Chop Chow Grocery List</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <Header2 />
        <Cart/>

        <Footer />
    </div >
}

export default CartPage;