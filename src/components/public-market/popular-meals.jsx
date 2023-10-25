import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from './stores.module.css'
import { GoStarFill } from "react-icons/go"
import { useRouter } from "next/router"
import { AiOutlineClose } from 'react-icons/ai'
import { GrStar } from "react-icons/gr"
import { BsCurrencyDollar } from 'react-icons/bs'
import Link from "next/link"

export const PopularMeals = () => {
    const [meals, setMeals] = useState([])
    const [visibleMeals, setVisibleMeals] = useState(8)
    const [selectedItem, setSelectedItem] = useState({})
    const [openModal, setOpenModal] = useState(false)

    const loadMore = () => {
        setVisibleMeals(visibleMeals + 4)
    }
    const router = useRouter()

    const fetchMeals = async () => {
        try {
            const response = await axios(`/items/1?type=Meal&status=all&limit=50`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.items, 'ress')
            setMeals(response.data.data.items)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchMeals()
    }, [])

    const filteredMeals = meals.filter(meal => meal.item_type === 'Meal' && meal.average_rating);

    return (
        <div className={styles.mealContainer}>
            <h4>Popular Meals</h4>
            <div className={styles.stores2}>
                {
                    filteredMeals.slice(0, visibleMeals).filter(meal => Boolean(meal.total_rating)).map((meal, idx) => {
                        return (
                            <div className={styles.card1} key={idx} onClick={() => {
                                setSelectedItem(meal)
                                setOpenModal(true)
                            }}>
                                {

                                    <div className={styles.box}>
                                        <img src={meal?.itemImage0} className={styles.storeImg1} />
                                        <div className={styles.flex}>
                                            <p className={styles.name2}>{meal.item_name}</p>
                                            <p>$8.43</p>
                                        </div>
                                        <p className={styles.storeName}>Chop Chow Official Store</p>
                                        <div className={styles.flex}>
                                            <div>
                                                {
                                                    Array(5).fill('_').map((_, idx) => <GoStarFill key={idx + _} color={meal.average_rating > idx ? '#04D505' : 'rgba(0,0,0,0.5)'} style={{ marginLeft: '.2rem' }} />)
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
                        <div className={styles.modalCard2}>
                            <div className={styles.flexed2}>
                                <div className={styles.images2}>
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
                                <div className={styles.right2}>
                                    <div className={styles.flex3}>
                                        <h6 className={styles.itemName}>{selectedItem.item_name}</h6>
                                        {/* <div className={styles.round} onClick={() => setOpenModal(false)}> <AiOutlineClose /></div> */}
                                    </div>
                                    <p className={styles.storeName}> From {selectedItem.store_name}</p>
                                    <div className={styles.rates}>
                                        {
                                            Array(5).fill('_').map((_, idx) => <GrStar size={20} key={idx + _} color={selectedItem.average_rating > idx ? '#04D505' : 'rgba(0,0,0,0.5)'} />)
                                        }
                                    </div>
                                    <p className={styles.intro}>{selectedItem.item_intro}</p>
                                    <div className={styles.flex1}>
                                        <h4 className={styles.modalTitle}>Meal Category:</h4>
                                        <div className={styles.cat} style={{ marginTop: '-.5rem' }}>
                                            <p className={styles.intro}>
                                                {selectedItem?.item_categories.map((cat) => cat.category_name)?.toString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.flexer}>
                                        <div>
                                            <span className={styles.prepspan}><p className={styles.prep}>PrepTime: </p><p style={{ marginLeft: '.8rem' }}>{selectedItem.meal_cook_time} Minutes</p></span>
                                            <div className={styles.flex1}>
                                                <h4 className={styles.prep}>Serves:</h4>
                                                <div className={styles.flex2} style={{ marginLeft: '1rem' }}>
                                                    <p className={styles.box2}>-</p>
                                                    <p style={{ marginRight: '1rem' }}>2</p>
                                                    <p className={styles.box2}>+</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className={styles.prepspan}><p className={styles.prep}>CookTime: </p><p style={{ marginLeft: '.8rem' }}>{selectedItem.meal_prep_time} Minutes</p></span>
                                            <span className={styles.prepspan}><p className={styles.prep}>Chef:</p><p className={styles.underline}>{selectedItem.meal_chef}</p></span>
                                        </div>

                                    </div>
                                    <div>
                                        <p className={styles.prep}>Add Meal Ingredients</p>
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
            <div className={styles.border} />
        </div>
    )
}