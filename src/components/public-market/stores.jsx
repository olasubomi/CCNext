import { useState, useEffect } from "react"
import axios from "../../util/Api"
import styles from "./stores.module.css"
import { MealDropDown } from "./dropdown"
import { useRouter } from "next/router"
import sale from '../../../public/assets/store_pics/sale.jpg'
import stored from '../../../public/assets/store_pics/store.jpg'
import Image from "next/image"


export const Stores = () => {
    const [stores, setStores] = useState([])
    const [show, setShow] = useState(false)

    const [selectedStore, setSelectedStore] = useState({
        items: [],
        supplier: {}
    })

    const fetchOneStore = async (id) => {
        try {
            const response = await axios(`/stores/getstore/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.data, 'one store')
            setSelectedStore(response.data.data)
            setShow(true)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStores = async () => {
        try {
            const response = await axios(`/stores/getallstores/1?limit=25`, {
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
    console.log(selectedStore, 'selectedStore')
    return (
        <div className={styles.storeContainer}>
            <h4>Stores</h4>
            <div className={styles.stores}>
                {
                    stores.slice(2, 7).map((store, id) => {
                        return (
                            <div className={styles.card} onClick={() => fetchOneStore(store._id)}>
                                {
                                    
                                    <div>
                                        <Image src={store?.background_picture ? store?.background_picture : stored} className={styles.storeImg} width={200} height={200} objectFit="cover" objectPosition='center' />
                                        <p className={styles.name}>{store?.store_name}</p> </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                show && <MealDropDown selectedStore={selectedStore} id={selectedStore.supplier._id} />
            }
            <p className={styles.view}>View More</p>
            <div className={styles.border} />
        </div>
    )
}