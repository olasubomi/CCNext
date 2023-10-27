import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from "./stores.module.css"
export const Stores = () => {
    const [stores, setStores] = useState([])

    const fetchStores = async () => {
        try {
            const response = await axios(`/stores/getallstores/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data.products, 'resp')
            setStores(response.data.data.products)
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        fetchStores()
    }, [])
    return (
        <div className={styles.storeContainer}>
            <h4>Stores</h4>
            <div className={styles.stores}>
                {
                    stores.map((store, id) => {
                        return (
                            <div className={styles.card}>
                                {
                                    store.background_picture &&
                                    <div>
                                        <img src={store?.background_picture} className={styles.storeImg} />
                                        <p className={styles.name}>{store?.store_name}</p> </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <p className={styles.view}>View More</p>
            <div className={styles.border} />
        </div>
    )
}