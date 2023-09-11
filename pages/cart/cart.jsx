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


const CartPage = () => {
    const { cartItems, addItemsToCart, removeCartItem, clearCartItem } = useCart()
    const [pop, setPop] = useState(false)
    console.log(cartItems, 'ffg')
    return <div>
        <Head>
            <title>Chop Chow Grocery List</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <Header2 />
        <div className={styles.container1}>
            <div className={styles.header}>
                <div className={styles.one}>
                    <GoBack />
                    <p className={styles.title} style={{ color: '#000', letterSpacing: '.1rem' }}>Cart</p>
                </div>

            </div>
            <div className={styles.button_text2}>
                <div style={{ width: '100%', marginTop: '5rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '20px' }}>
                        <thead style={{ textAlign: 'left', paddingBottom: '4rem', width: '100%' }}>
                            <div className={styles.thead}>
                                <th className={styles.th}>Product</th>
                                <th className={styles.th}>Quantity</th>
                                <th className={styles.th}>Store</th>
                                <th className={styles.th}>Price</th>
                                <th className={styles.th}>Subtotal</th>
                                <th className={styles.th}>Action</th>
                            </div>
                        </thead>
                        <tbody style={{ height: '100%' }}>
                            {
                                cartItems.map((element, idx) => (
                                    <tr key={idx} className={styles.tr}>
                                        <td className={styles.td}>
                                            <Image src={element?.itemImage0} height={50} width={55} />
                                            <p style={{ marginLeft: '1.5rem' }}>{element.item_name}</p>
                                        </td>
                                        <td className={styles.td}>
                                            <p onClick={() => removeCartItem(element)} className={styles.box}>-</p>
                                            <p>{element.qty}</p>
                                            <p onClick={() =>  addItemsToCart(element)} className={styles.box} style={{ marginLeft: '1rem' }}>+</p>
                                        </td>
                                        <td className={styles.td} style={{ textAlign: 'center' }}>{element.store_name ? element.store_name : '-'}</td>
                                        <td className={styles.td}>{element?.item_price ? element?.item_price : 'N/A'}</td>
                                        <td className={styles.td} style={{ textAlign: 'center' }}>{element?.item_price ? element?.item_price : 'N/A'}</td>
                                        <td onClick={() => clearCartItem(element)} className={styles.td} style={{ textAlign: 'center' }}><IoMdCloseCircle size={23} color='#949494' /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <p className={styles.price}> Total Price: $ 44.33</p>
                    { pop &&
                              <div className={styles.popup_content2}>
                              <BiSolidInfoCircle size={23} color="#000" />
                              <p className={styles.add2}>This feature will be available soon</p>
                          </div>
                        }
                    <div className={styles.cartBtns}>
                        <button className={styles.cartbtn3}>
                            Clear Cart
                        </button>
                       
                        <button className={styles.cartbtn4} onClick={() => setPop(!pop)}>
                            Check Out
                        </button>
                    </div>
                    <div className={styles.price} style={{ marginTop: '2rem' }}>
                        <p className={styles.check}>Checkout as a Guest</p>
                    </div>
                    
                </div>


            </div>



        </div>

        <Footer />
    </div >
}

export default CartPage;
