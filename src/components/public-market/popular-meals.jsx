import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from './stores.module.css'

export const PopularMeals = () => {
    const [meals, setMeals] = useState([])

    const fetchMeals = async () => {
        try {
            const response = await axios(`/items/1?type=Product,Meal&status=all&limit=50`, {
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

    return(
        <div className={styles.mealContainer}>
            <h4>Popular Meals</h4>
            <div className={styles.popular}>
                {
                    meals.map((meal) => {
                        return(
                            <div className={styles.meal}>
                                {
                                    Boolean(meal.total_rating) && meal.item_type === 'Meal' ?
                                        <img src={meal?.itemImage0} className={styles.img}/>
                                    : null
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}