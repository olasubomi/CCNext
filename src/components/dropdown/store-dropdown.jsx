import { useRouter } from "next/router";
import { GoTriangleUp } from "react-icons/go";
import styles from "../../components/public-market/public-market.module.css";
import { useRef, useState } from "react";
import axios from "../../util/Api";
import { useEffect } from "react";
import { useMediaQuery } from "../../hooks/usemediaquery";
import { IoIosSearch } from "react-icons/io";
import { GoSearch } from "react-icons/go";

export const StoreSearch = ({ setShowDropdown }) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");
    const [chef, setChef] = useState("");
    const [items, setItems] = useState([]);
    const [store, setStore] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const [categories, setCategories] = useState([
        {
            label: "All",
            value: true,
        },
        {
            label: "Stores",
            value: true,
        },
        {
            label: "Meals",
            value: true,
        },
        {
            label: "Products",
            value: true,
        },
        {
            label: "Kitchen Utensils",
            value: true,
        },
    ]);
    const ref = useRef();
    const [oneStore, setOneStore] = useState({
        visible: false,
        id: "",
        name: ""
    });


    const getStore = async (name) => {
        try {
            const response = await axios.get(`/stores/store/${name}`);
            const resp = response.data.data.supplier.map((element) => {
                return {
                    label: element.store_name,
                    value: element._id,
                };
            });
            setStore(resp);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        document.addEventListener(
            "click",
            (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setShow(false);
                }
            },
            true
        );
    }, []);
    useEffect(() => {
        document.addEventListener(
            "click",
            (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setShowDropdown(false);
                }
            },
            true
        );
    }, []);

    return (
        <div className={styles.two3} ref={ref}>
            <div className={styles.searchflex}>
                <div className={styles.searchboxfield}>
                    <GoSearch size={12} color="rgba(148, 148, 148, 1)" />
                    <input
                        placeholder="Search for store"
                        autoComplete="off"
                        onFocus={() => setShow(true)}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            getStore(e.target.value);
                        }}
                        type="search"
                        name="search"
                    />
                    {show && (
                        <div className={styles.searchDropdown}>
                            <>
                                <>
                                    {categories.find((ele) => ele.label === "Stores")?.value && (
                                        <>
                                            <h4 className={styles.storeTitle}>
                                                Stores ({store.length})
                                            </h4>
                                            <div className={styles.bord} />
                                            <div className={styles.list}>
                                                {store.length === 0 ? (
                                                    Boolean(value) ? (
                                                        <div className={styles.result}>
                                                            <p>No Result Found</p>
                                                            <button
                                                                onClick={() =>
                                                                    router.push(`/suggest-store/${value}`)
                                                                }
                                                            >
                                                                Suggest Store
                                                            </button>
                                                        </div>
                                                    ) : null
                                                ) : (
                                                    store.slice(0, 4).map((stores) => (
                                                        <p
                                                            key={stores.value}
                                                            onClick={() => {
                                                                setOneStore({
                                                                    visible: true,
                                                                    id: stores.value,
                                                                    name: stores.label
                                                                });
                                                                setValue(stores.label);
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {stores.label}
                                                        </p>
                                                    ))
                                                )}
                                            </div>
                                        </>
                                    )}
                                </>
                            </>
                        </div>
                    )}
                </div>
                <button
                    className={styles.searchbtn}
                    onClick={() => {
                        if (oneStore.visible) {
                            localStorage.setItem("storeId", oneStore.id)
                            router.push(`/store/${oneStore.name}`);

                        } else {
                            // router.push(`/meal/${value}`);
                        }
                    }
                    }
                >
                    <IoIosSearch size={15} />
                </button>
            </div>
        </div>
    );
};
