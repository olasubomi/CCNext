import { useState, useEffect, useRef, Fragment, createRef } from "react"
import axios from "../../util/Api"
import styles from "./stores.module.css"
import { MealDropDown } from "./dropdown"
import stored from '../../../public/assets/store_pics/store.jpg'
import Image from "next/image"


export const Stores = () => {
    const [stores, setStores] = useState([])
    const [show, setShow] = useState(false)
    const [selected, SetSelected] = useState(null)
    const [loadMore, setLoadMore] = useState(5)
    const [refArr, setRefArr] = useState([])
    const ref = useRef([]);

    const [selectedStore, setSelectedStore] = useState({
        items: [],
        supplier: {}
    })
    const handleLoadMore = () => {
        setLoadMore(loadMore + 5)
    }

    const fetchOneStore = async (id) => {
        try {
            // const response = await axios(`/stores/getstore/${id}`, {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });
            // console.log(response.data.data, 'one store')
            // setSelectedStore(response.data.data)
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

    useEffect(() => {

    }, [selected])

    console.log('ddd', ref)
    

    return (
        <div className={styles.storeContainer}>
            
            <h4>Stores</h4>
      


            <p className={styles.view} onClick={() => handleLoadMore()}>View More</p>
            <div className={styles.border} />
        </div>
        
    )
}
