import Image from 'next/image'
import styles from '../../components/public-market/public-market.module.css'
import { useState } from 'react'
import { GrStar } from 'react-icons/gr'
import { BsCurrencyDollar } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import {useRouter} from 'next/router'


export const MealDropDown = ({ selectedStore, id }) => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const router = useRouter()

    console.log(selectedItem, 'selectedItem')
    return (
        <div className={styles.dropdownContainer}>
            <p>You are responsible for operations, service, or
                customer support and face challenges trying to communicate
                complex procedures to a global market effectively.
                Traditional methods don’t work and are laborious, costly and error prone.
            </p>
            <div className={styles.dropdown}>
                {
                    selectedStore.items.slice(0, 5).map((meal, idx) => {
                        return (
                            <div className={styles.mealCard} onClick={() => {
                                setSelectedItem(meal)
                                setOpenModal(true)
                            }}>
                                <img src={meal?.itemImage0} alt='' className={styles.img} />
                                <div className={styles.flex}>
                                    <p className={styles.name}>{meal?.item_name}</p>
                                    <p className={styles.name2}> {meal.item?.price ? '$' +`${meal?.item_price}`: 'N/A'}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <button className={styles.view} onClick={() => router.push(`/store/${id}`)}>View Store</button>
            {
                openModal &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalCard}>
                        <div className={styles.flexed}>
                            <div className={styles.images}>
                                <img src={selectedItem?.itemImage0} alt='' className={styles.modalImg} />
                                <div className={styles.images1}>
                                    {
                                        selectedItem.item_images.map((image, idx) => {
                                            return (
                                                <div className={styles.img1}>
                                                    <img src={image} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.flex3}>
                                    <h6 className={styles.itemName}>{selectedItem.item_name}</h6>
                                    <div className={styles.round} onClick={() => setOpenModal(false)}> <AiOutlineClose /></div>
                                </div>
                                <p className={styles.storeName}> From {selectedItem.store_name}</p>
                                <div className={styles.rates}>
                                    {
                                        Array(5).fill('_').map((_, idx) => <GrStar size={20} key={idx + _} color={selectedItem.average_rating > idx ? '#04D505' : 'rgba(0,0,0,0.5)'} />)
                                    }
                                </div>
                                <p className={styles.intro}>{selectedItem.item_intro}</p>
                                <div>
                                    <h4 className={styles.modalTitle}>Product Category</h4>
                                    <p className={styles.intro} style={{ marginTop: '-.5rem' }}>portable, food, great</p>
                                </div>
                                <div>
                                    <h4 className={styles.modalTitle2}>Quantity</h4>
                                    <div className={styles.flex2}>
                                        <p className={styles.box}>-</p>
                                        <p>2</p>
                                        <p className={styles.box}>+</p>
                                    </div>
                                    <div>
                                        <h4 className={styles.modalTitle2}>Available Quantity</h4>
                                        <p className={styles.intro} style={{ marginTop: '-.5rem' }}>43 left</p>
                                    </div>
                                    <div className={styles.end}>
                                        <h4 className={styles.modalTitle} style={{ marginRight: '6.3rem' }}>Price</h4>
                                        <span className={styles.span}> <h2 style={{ display: 'flex', alignItems: 'center' }} className={styles.price}><BsCurrencyDollar /> {selectedItem.item_price}</h2><p className={styles.piece}> /piece</p></span>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className={styles.border} />
                        <div className={styles.buttons}>
                            <button className={styles.outlinebtn}>
                                <Link href={`/meal/${selectedItem.item_name}`}>
                                    View More
                                </Link>
                            </button>
                            <button className={styles.outlinebtn}>Add to Grocery List</button>
                            <button className={styles.btn}>Add to Cart</button>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}