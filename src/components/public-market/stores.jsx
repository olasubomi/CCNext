import { useState, useEffect, useRef } from "react"
import axios from "../../util/Api"
import styles from "./stores.module.css"
import { MealDropDown } from "./dropdown"
import stored from '../../../public/assets/store_pics/store.jpg'
import Image from "next/image"


export const Stores = () => {
    const [stores, setStores] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [selected, SetSelected] = useState(null)
    const [loadMore, setLoadMore] = useState(5)
    const ref = useRef();

    const [selectedStore, setSelectedStore] = useState({
        items: [],
        supplier: {}
    })
    const handleLoadMore = () => {
        setLoadMore(loadMore + 5)
    }

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
            setIsShow(true)
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
                    stores.slice(0, loadMore).map((store, id) => {
                        return (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div key={id} className={`${styles.cardWrapper}`}>
                                        <div className={styles.card} onClick={() => {
                                            fetchOneStore(store._id)
                                            SetSelected(id)
                                        }} id="meals">
                                            {
                                                <div>
                                                    <Image src={store?.background_picture ? store?.background_picture : stored} className={styles.storeImg} width={200} height={200} objectFit="cover" objectPosition='center' />
                                                    <p className={styles.name}>{store?.store_name}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {
                                        isShow && selected === id &&
                                        <MealDropDown
                                            setIsShow={setIsShow}
                                            selectedStore={selectedStore}
                                            id={selectedStore.supplier._id} />

                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>


            <p className={styles.view} onClick={() => handleLoadMore()}>View More</p>
            <div className={styles.border} />
        </div>
    )
}