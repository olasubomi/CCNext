import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from './stores.module.css'
import { GoStarFill } from "react-icons/go"

export const TopSellingProducts = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios(`/items/1?type=Product,Meal&status=all&limit=50`, {
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

    const filteredProducts = products.filter(product => product.item_type === "Product");
    return (
        <div className={styles.mealContainer1}>
            <h4>Top Selling Products</h4>
            <div className={styles.stores3}>
                {
                    filteredProducts.slice(0, 5).map((product, idx) => {
                        console.log(product.item_name, product?.itemImage0, 'pp')

                        return (
                            <div className={styles.card1} key={idx}>
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

            </div>
            <p className={styles.view}>View More</p>
        </div>
    )
}