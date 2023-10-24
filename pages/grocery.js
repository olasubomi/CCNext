import Head from "next/head";
import React, { useState, useEffect } from "react";
import Header, { Header2 } from "../src/components/Header/Header";
import GoBack from "../src/components/CommonComponents/goBack";
import styles from '../src/components/grocery/grocery.module.css'
import Image from "next/image";
import noteGif from '../public/assets/icons/gif.gif'
import Footer from "../src/components/Footer/Footer";
import { Modal } from "../src/components/modal/popup-modal";
import { disableBodyScroll } from 'body-scroll-lock';
import girl from "../public/assets/icons/girl.jpg"
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete, MdRemoveRedEye } from 'react-icons/md'
import { HiDotsHorizontal } from 'react-icons/hi'
import axios from "../src/util/Api";
import { useRouter } from "next/router";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast } from "react-toastify";
import yellow from '../public/assets/meal_pics/yellow.jpeg'
import Frame from "../public/assets/logos/Frame.png"
import { GroceryModal } from "../src/components/modal/grocery-modal";

const Grocery = () => {
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [groceryList, setGroceryList] = useState([])
    const router = useRouter();

    const [details, setDetails] = useState({
        listName: '',
        description: '',
        id: '',
        status: ""
    })
    const fetchList = async () => {
        try {
            const response = await axios(`/groceries/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.data, 'resp')
            setGroceryList(response.data.data.data)
        } catch (error) {
            console.log(error);
        }

    }

    const deleteGrocery = async (id) => {
        try {
            const response = await axios.delete(`/groceries/create/${id}`)
            toast.success('Delete successful')
            fetchList()
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchList()
    }, [])

    useEffect(() => {
        const doc = document.querySelector('#modal_container')
        console.log(doc)
        disableBodyScroll(doc)

    }, [show])
    console.log(groceryList.groceryItems, 'groceryy')
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
                {groceryList.length > 0 ?
                    <div className={styles.all_cards}>

                        {groceryList.map((ele, id) => (
                            <div className={ele.groceryItems.length > 0 ? styles.card2 : styles.noImages} key={id}>
                                <div className={styles.column1}>
                                    <div className={styles.flex2}>
                                        <h4 className={styles.title2}>{ele.listName}</h4>
                                        <Popup trigger={<div> <HiDotsHorizontal className={styles.dots} /> </div>} position="bottom right" className={styles.popup_content}>
                                            <div>
                                                <div onClick={() => {
                                                    setDetails({
                                                        listName: ele.listName,
                                                        description: ele.description,
                                                        id: ele._id
                                                    })
                                                    setShow(true)
                                                }} className={styles.flex} style={{ justifyContent: 'flex-start', cursor: 'pointer', padding: '.7rem' }}>
                                                    <AiFillEdit size={17} color="#F47900" />
                                                    <p className={styles.text3} style={{ marginLeft: '.5rem' }}>Edit List</p>
                                                </div>
                                                <div onClick={() => deleteGrocery(ele._id)} className={styles.flex} style={{ justifyContent: 'flex-start', cursor: 'pointer', padding: '.8rem', zIndex: '1000' }}>
                                                    <MdDelete size={19} color='#F47900' />
                                                    <p className={styles.text3} style={{ marginLeft: '.5rem' }}>Delete List</p>
                                                </div>
                                                {
                                                    ele.groceryItems.length ?
                                                        <div className={styles.flex}
                                                            style={{
                                                                justifyContent: 'flex-start',
                                                                cursor: 'pointer',
                                                                padding: '.8rem',
                                                                opacity: ele?.groceryItems?.length ? '1' : '0.4'

                                                            }}>
                                                            <MdRemoveRedEye size={17} color='#F47900' />
                                                            <p className={styles.text3} style={{ marginLeft: '.5rem' }} onClick={() => {
                                                                setDetails({
                                                                    listName: ele.listName,
                                                                    description: ele.description,
                                                                    status: ele?.status,
                                                                    id: ele._id
                                                                })
                                                                setOpenModal(true)
                                                            }}>Make Public</p>
                                                        </div>
                                                        : <div className={styles.flex}
                                                            style={{
                                                                justifyContent: 'flex-start',
                                                                cursor: 'pointer',
                                                                padding: '.8rem',
                                                                opacity: ele?.groceryItems?.length ? '1' : '0.4'

                                                            }}>
                                                            <MdRemoveRedEye size={17} color='#F47900' />
                                                            <p className={styles.text3} style={{ marginLeft: '.5rem' }} >Make Public</p>
                                                        </div>
                                                }
                                            </div>
                                        </Popup>
                                    </div>
                                    <p className={styles.text}>
                                        {ele.description}
                                    </p>
                                    <p className={ele.groceryItems.length > 0 ? styles.length : styles.length2}>{ele.groceryItems?.length} Items</p>
                                    <div className={ele.groceryItems?.length ? styles.images : styles.noimages}>
                                        {
                                            ele.groceryItems?.length ? ele.groceryItems?.slice(0, 3)?.map((elem, idx) => (
                                                <>
                                                    {
                                                        !elem.hasOwnProperty('itemData') ?
                                                            <div style={{ display: 'flex', alignItems: 'center' }} key={idx}>

                                                                <div className={styles.oneImage}>
                                                                    {

                                                                        elem.item?.itemImage0 ? <Image src={elem?.item?.itemImage0} width={95} height={100} className={styles.imgs} /> :
                                                                            <Image src={Frame} width={95} height={100} objectFit='cover' objectPosition='center' className={styles.imgs2} />
                                                                    }
                                                                    <p className={styles.name2}>{elem?.item?.item_name}</p>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div style={{ display: 'flex', alignItems: 'center' }} key={idx}>

                                                                <div className={styles.oneImage}>
                                                                    <Image src={Frame} width={95} height={100} objectFit='cover' objectPosition='center' className={styles.imgs} />
                                                                    <p className={styles.name2}>{elem?.itemData?.item_name}</p>
                                                                </div>
                                                            </div>
                                                    }
                                                </>
                                            )) :
                                                <div>

                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className={styles.flex2} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                                    <div className={styles.flex}>
                                        <Image src={girl} width={40} height={40} className={styles.person} />
                                        <p className={styles.name}>{ele.user.first_name} {ele.user.last_name}</p>
                                    </div>
                                    <div onClick={() => router.push(`/grocerylist/groceries/${ele._id}`)} className={styles.two2}>
                                        <p className={styles.button_text} style={{ cursor: 'pointer' }}>{ele.groceryItems?.length ? 'Show Items' : ' Add Items'}</p>
                                    </div>
                                </div>
                            </div>
                        ))} </div> :
                    <div className={styles.card}>
                        <Image src={noteGif} height={200} width={250} className={styles.image} />
                        <div className={styles.flex}>
                            <p className={styles.card_text}>You have no Grocery List.</p>
                            <div onClick={() => setShow(!show)}>
                                <p className={styles.card_text} style={{ color: '#F47900', marginLeft: '.5rem', cursor: 'pointer' }}>Create New List</p>
                            </div>
                        </div>
                    </div>
                }
            </div>

            {
                show &&
                <Modal
                    show={show}
                    setShow={setShow}
                    fetchList={fetchList}
                    details={details}
                    setDetails={setDetails}
                />
            }
            {
                openModal &&
                <GroceryModal
                    details={details}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    refetch={() => fetchList()}
                />
            }
            <Footer />
        </div >
    )

}

export default Grocery