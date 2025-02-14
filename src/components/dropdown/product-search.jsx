import { useRouter } from "next/router";
import { GoTriangleUp } from "react-icons/go";
import styles from "../../components/public-market/public-market.module.css";
import { useRef, useState } from "react";
import axios from "../../util/Api";
import { useEffect } from "react";
import { useMediaQuery } from "../../hooks/usemediaquery";
import { IoIosSearch } from "react-icons/io";
import { GoSearch } from "react-icons/go";

export const ProductSearch = ({ setShowDropdown }) => {
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

    const filteredProduct = () => {
        return items.filter((elem) => elem.item_type === "Product");
    };

    const getItem = async (name) => {
        try {
            const response = await axios.get(`/items/filter/${name}`);
            const resp = response.data.data.map((element) => {
                return {
                    label: element.item_name,
                    value: element._id,
                    image: element?.itemImage0,
                    price: element?.item_price ? `$${element?.item_price}` : "No Price",
                    store: element?.store_available?.store_name || "No store",
                    item_type: element?.item_type,
                    meal_chef: element?.meal_chef,
                    user: `${element.user?.first_name} ${element?.user?.last_name}`
                };
            });
            setItems(resp);
            console.log(response.data.data, "resp");
        } catch (error) {
            console.log(error);
        }
        return name;
    };

    console.log(items, 'product items')
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
                        placeholder="Search for product"
                        autoComplete="off"
                        onFocus={() => setShow(true)}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            getItem(e.target.value);
                        }}
                        type="search"
                        name="search"
                    />
                    {show && (
                        <div className={styles.searchDropdown}>
                            <>
                                {categories.find((ele) => ele.label === "Products")?.value && (
                                    <>
                                        <h4 className={styles.storeTitle}>
                                            Products ({filteredProduct().length})
                                        </h4>
                                        <div className={styles.bord} />
                                        <div className={styles.list}>
                                            {filteredProduct().length === 0 ? (
                                                Boolean(value) ? (
                                                    <div className={styles.result}>
                                                        <p>No Result Found</p>
                                                        <button onClick={() => router.push("/suggestproduct")}>
                                                            Suggest Product
                                                        </button>
                                                    </div>
                                                ) : null
                                            ) : (
                                                filteredProduct()
                                                    ?.slice(0, 4)
                                                    .map((elem) => (
                                                        <p
                                                            key={elem.value}
                                                            onClick={() => {
                                                                console.log(elem, 'elem')
                                                                setValue(elem.label);
                                                                setChef(elem.user)
                                                            }}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {elem.label}
                                                        </p>
                                                    ))
                                            )}
                                        </div>
                                    </>
                                )}
                            </>
                        </div>
                    )}
                </div>
                <button
                    className={styles.searchbtn}
                    onClick={() => {
                        if (
                            items.filter(
                                (ele) =>
                                    ele.item_type === "Product" && ele.item_type !== "Meal"
                            )
                        ) {
                            router.push(`/product/${chef}/${value}`);
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
