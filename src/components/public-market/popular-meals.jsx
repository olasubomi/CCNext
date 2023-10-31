import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from './stores.module.css'
import { GoStarFill } from "react-icons/go"
import { useRouter } from "next/router"
import { AiOutlineClose } from 'react-icons/ai'
import { GrStar } from "react-icons/gr"

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import Link from "next/link"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { toast } from 'react-toastify';
import { IndividualModal } from "../modal/individual-meal-product"

export const PopularMeals = () => {
    const [meals, setMeals] = useState([])
    const [visibleMeals, setVisibleMeals] = useState(8)
    const [selectedItem, setSelectedItem] = useState({})

    const [selectGrocery, setSelectGrocery] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [show, setShow] = useState(false)
    const [openList, setOpenList] = useState(false)

    const loadMore = () => {
        setVisibleMeals(visibleMeals + 4)
    }
    const router = useRouter()

    const [itemToAdd, setItemAdd] = useState({
        listName: "",
    })

    const addItemToGrocery = async (listName) => {

        const user = JSON.parse(localStorage.getItem('user'))
        const payload = {
            userId: user._id,
            groceryList: {
                listName: itemToAdd.listName || listName,
                groceryItems: {
                    itemId: selectedItem._id,
                }
            }
        }

        console.log(payload, 'payload')
        try {
            const response = await axios(`/groceries`, {
                method: 'post',
                data: payload
            })
            toast.success('Item added successfully')
            setOpenList(false)
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }
    const [details, setDetails] = useState({
        listName: '',
        description: '',
        id: '',
        status: ""
    })

    const fetchMeals = async () => {
        try {
            const response = await axios(`/items/1?type=Meal&status=all&limit=50`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.items, 'ressw')
            setMeals(response.data.data.items)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchMeals()
    }, [])
    const fetchGroceryList = async () => {
        try {
            const response = await axios(`/groceries/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.data, 'groceries')
            setSelectGrocery(response.data.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchGroceryList()
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

                <IndividualModal
                    openList={openList}
                    openModal={openModal}
                    selectGrocery={selectGrocery}
                    selectedItem={selectedItem}
                    setOpenList={setOpenList}
                    setOpenModal={setOpenModal}
                    show={show}
                    details={details}
                    setDetails={setDetails}
                    addItemToGrocery={addItemToGrocery}
                    setItemAdd={setItemAdd}
                    setShow={setShow} />
            </div>
            <p className={styles.view} onClick={() => loadMore()}>View More</p>
            <div className={styles.border} />
        </div>
    )
}
