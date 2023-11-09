import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import Header, { Header2 } from "../../src/components/Header/Header";
import GoBack from "../../src/components/CommonComponents/goBack";
import styles from '../../src/components/public-market/public-market.module.css'
import { HiLocationMarker } from 'react-icons/hi'
import { DropDownSelect } from "../../src/components/select/select";
import { Search } from "../../src/components/select/search";
import { PopularMeals, Stores, TopSellingProducts, SuggestedUtensils } from "../../src/components/public-market";
import Footer from "../../src/components/Footer/Footer";
import { useRouter } from "next/router";
import { storeList } from "../../src/components/public-market/lists";
import axios from "../../src/util/Api";
import SelectDropDown from "../../src/components/select/category-select";
import { Store } from "@mui/icons-material";

const PublicMarket = () => {
    const router = useRouter();
    const [show, setShow] = useState(false)
    const [value, setValue] = useState('')
    const [items, setItems] = useState([])
    const [store, setStore] = useState([])
    const ref = useRef();
    const [oneStore, setOneStore] = useState({
        visible: false,
        id: ''
    })

    const getItem = async (name) => {
        try {
            const response = await axios.get(`/items/filter/${name}`)
            const resp = response.data.data.map(element => {
                return {
                    label: element.item_name,
                    value: element._id,
                    image: element?.itemImage0,
                    price: element?.item_price ? `$${element?.item_price}` : 'No Price',
                    store: element?.store_available?.store_name || 'No store',
                    item_type: element?.item_type
                }
            })
            setItems(resp)
            console.log(resp, 'resp')
        } catch (error) {
            console.log(error)
        }
        return name
    }
    console.log(items, 'item')

    const getStore = async (name) => {
        try {
            const response = await axios.get(`/stores/store/${name}`)
            const resp = response.data.data.supplier.map(element => {
                return {
                    label: element.store_name,
                    value: element._id
                }
            })
            setStore(resp)
        } catch (error) {
            console.log(error)
        }
    }
    const filteredItem = () => {
        return items.filter((elem) => (elem.item_type === 'Meal'))
    }
    const filteredProduct = () => {
        return items.filter((elem) => (elem.item_type === 'Product'))
    }
    const filteredUtensils = () => {
        return items.filter((elem) => (elem.item_type === 'Utensils'))
    }
    useEffect(() => {
        const path = router.asPath.split('#')
        if (Array.isArray(path) && path.length === 2) {
            const doc = document.querySelector(`#${path[1]}`)
            if (doc) {
                doc.scrollIntoView()
            }
        }
    }, [])
    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }, true)
    }, [])
    console.log(store, 'store')
    return (
        <div className={styles.container}>
            <Head>
                <title>Chop Chow Grocery</title>
                <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Header2 />
            <div className={styles.header}>
                <p className={styles.title}>Access stores near you</p>
                <input type="search" name="name" placeholder="Enter Delivery Address" className={styles.searchbar} />
                <HiLocationMarker size={17} className={styles.locationIcon} fill='#949494' />
            </div>
            <div className={styles.header2}>
                <GoBack />
                <div className={styles.two}>
                    <SelectDropDown placeholder='All categories' />
                    <div ref={ref} className={styles.searchflex}>
                        <div className={styles.search}>

                            <input
                                placeholder="Search"
                                autoComplete="off"
                                onFocus={() => setShow(true)}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value)
                                    getItem(e.target.value)
                                    getStore(e.target.value)
                                }}
                                type="text" name="search" />
                            {
                                show && <div className={styles.searchDropdown}>
                                    <h4 className={styles.storeTitle}>Stores ({store.length})</h4>
                                    <div className={styles.bord} />
                                    <div className={styles.list}>
                                        {store.length === 0 
                                        ?
                                            Boolean(value)
                                                ? <div className={styles.result}>
                                                    <p>No Result Found</p>
                                                </div> : null
                                                 : store.slice(0, 4).map((stores) => (
                                                    <p key={stores.value} onClick={() => {
                                                        setOneStore({
                                                            visible: true,
                                                            id: stores.value
                                                        })
                                                        setValue(stores.label)
                                                    }} style={{cursor: 'pointer'}}>{stores.label}</p>

                                                ))

                                        }
                                    </div>
                                    <h4 className={styles.storeTitle}>Meals ({filteredItem().length})</h4>
                                    <div className={styles.bord} />
                                    <div className={styles.list}>
                                        {
                                            filteredItem().length === 0 ?
                                                Boolean(value) ? <div className={styles.result}>
                                                    <p>No Result Found</p>
                                                    <button onClick={() => router.push('/suggestmeal')}>Suggest Meal</button>
                                                </div> : null
                                                :
                                                filteredItem()?.slice(0, 4).map((elem) => (
                                                    <p key={elem.value} onClick={() => {
                                                        setOneStore({
                                                            visible: false,
                                                            id: ''
                                                        })
                                                        setValue(elem.label)
                                                    }} style={{ cursor: 'pointer' }}>{elem.label}</p>
                                                ))
                                        }
                                    </div>
                                    <h4 className={styles.storeTitle}>Products ({filteredProduct().length})</h4>
                                    <div className={styles.bord} />
                                    <div className={styles.list}>
                                        {
                                            filteredProduct().length === 0 ?
                                                Boolean(value) ? <div className={styles.result}>
                                                    <p>No Result Found</p>
                                                    <button onClick={() => router.push('/suggestmeal')}>Suggest Product</button>
                                                </div> : null
                                                :
                                                filteredProduct()?.slice(0, 4).map((elem) => (
                                                    <p key={elem.value} onClick={() => {
                                                        setOneStore({
                                                            visible: false,
                                                            id: ''
                                                        })
                                                        setValue(elem.label)
                                                    }} style={{ cursor: 'pointer' }}>{elem.label}</p>
                                                ))
                                        }
                                    </div>
                                    <h4 className={styles.storeTitle}>Kitchen Utensils ({filteredUtensils().length})</h4>
                                    <div className={styles.bord} />
                                    <div className={styles.list}>
                                        {
                                            filteredUtensils().length === 0 ?
                                                Boolean(value) ? <div className={styles.result}>
                                                    <p>No Result Found</p>
                                                    <button onClick={() => router.push('/suggestmeal')}>Suggest Utensil</button>
                                                </div> : null
                                                :
                                                filteredUtensils()?.slice(0, 4).map((elem) => (
                                                    <p key={elem.value} onClick={() => {
                                                        setOneStore({
                                                            visible: false,
                                                            id: ''
                                                        })
                                                      setValue(elem.label)
                                                    }} style={{cursor: 'pointer'}}>{elem.label}</p>
                                                ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <button className={styles.searchbtn} onClick={() => {
                            if(oneStore.visible) {
                                router.push(`/store/${oneStore.id}`)
                            }
                           else{
                            items.item_type === 'Meal'
                            ? router.push(`/meal/${value}`)
                            : items.item_type === 'Product'
                                ? router.push(`/product/${value}`)
                                : router.push(`/product/${value}`)
                           }
                        }}>Search</button>
                    </div>
                </div>
            </div>
            <div className={styles.storeContainer}>
                <Stores />
            </div>
            <PopularMeals />
            <TopSellingProducts />
            <SuggestedUtensils />
            <Footer />
        </div>
    )
}
export default PublicMarket;