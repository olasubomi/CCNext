import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from './stores.module.css'
import { GoStarFill } from "react-icons/go"
import { useRouter } from "next/router"
import { AiOutlineClose } from 'react-icons/ai'
import { GrStar } from "react-icons/gr"
import { BsCurrencyDollar } from 'react-icons/bs'
import Link from "next/link"
import { toast } from 'react-toastify';


export const TopSellingProducts = () => {
    const [products, setProducts] = useState([])
    const [visibleProducts, setVisibleProducts] = useState(5)
    const [openModal, setOpenModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const router = useRouter()

    const loadMore = () => {
        setVisibleProducts(visibleProducts + 5)
    }

    // const addItemToGrocery = async () => {

    //     const user = JSON.parse(localStorage.getItem('user'))
    //     const payload = {
    //         userId: user._id,
    //         groceryList: {
    //             listName: itemList.listName,
    //             groceryItems: {
    //                 itemId: itemsToAdd.itemId,
    //             }
    //         }
    //     }

    //     console.log(payload, 'payload')
    //     try {
    //         const response = await axios(`/groceries`, {
    //             method: 'post',
    //             data: payload
    //         })

    //         toast.success('Item added successfully')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const fetchProducts = async () => {
        try {
            const response = await axios(`/items/1?type=Product&status=all&limit=50`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.items, 'ressee')
            setProducts(response.data.data.items)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const filteredProducts = products.filter(product => product.item_type === "Product" && product.average_rating);
    return (
        <div className={styles.mealContainer1}>
            <h4>Top Selling Products</h4>
            <div className={styles.stores3}>
                {
                    filteredProducts.slice(0, visibleProducts).map((product, idx) => {
                        console.log(product.item_name, product?.itemImage0, 'pp')

                        return (
                            <div className={styles.card1} key={idx} onClick={() => {
                                setSelectedItem(product)
                                setOpenModal(true)
                            }}>
                                {product?.itemImage0 &&

                                    <div className={styles.box}>
                                        <img src={product?.itemImage0} className={styles.storeImg2} />
                                        <div className={styles.flex}>
                                            <p className={styles.name2}>{product.item_name}</p>
                                            <p>$8.43</p>
                                        </div>
                                        <p className={styles.storeName}>Chop Chow Official Store</p>
                                        <div className={styles.flex}>
                                            <div>
                                                {
                                                    Array(5).fill('_').map((_, idx) => <GoStarFill key={idx + _} color={product.average_rating > idx ? '#04D505' : 'rgba(0,0,0,0.5)'} style={{ marginLeft: '.2rem' }} />)
                                                }
                                            </div>
                                            <p className={styles.prep}> 23 mins </p>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
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
                                        <div className={styles.intro} style={{ marginTop: '-.5rem' }}>{
                                            selectedItem?.item_categories.map((cat) => {
                                                <p className={styles.intro}>{cat}</p>
                                            })
                                        }</div>
                                    </div>
                                    <div>
                                        <h4 className={styles.modalTitle2}>Quantity</h4>
                                        <div className={styles.flex2}>
                                            <p className={styles.box2}>-</p>
                                            <p style={{ marginRight: '1rem' }}>2</p>
                                            <p className={styles.box2}>+</p>
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
            <p className={styles.view} onClick={() => loadMore()}>View More</p>

        </div>
    )
}