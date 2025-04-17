import { useState, useEffect, useRef, useCallback } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import { IndividualModal } from "../modal/individual-meal-product";
import { useMediaQuery } from "../../hooks/usemediaquery";
import { Mealmodal } from "../mobile/meal-modal";
import { Element, scroller } from "react-scroll";
import { addToCart } from "../../actions";
import { useDispatch } from "react-redux";
import { canItemBeAddedToCart } from "../../util/canAddToCart";
import { convertCurrency } from "../../actions/utils";
import { BiSolidDownArrow } from "react-icons/bi";

export const PopularMeals = () => {
  const matches = useMediaQuery("(min-width: 920px)");
  const [meals, setMeals] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [serve, setServe] = useState(0);
  const dispatch = useDispatch();
  const [saleType, setSaleType] = useState("For sale");
  const ref = useRef(null);
  const saleTypeRef = useRef("For sale");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [previousSaleType, setPreviousSaleType] = useState("");

  const router = useRouter();
  const [itemToAdd, setItemAdd] = useState({
    listName: "",
  });

  const addItemToGrocery = async (listName) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = {
      userId: user._id,
      groceryList: {
        listName: itemToAdd.listName || listName,
        groceryItems: {
          itemId: selectedItem._id,
          quantity: quantity.toString(),
        },
      },
    };

    try {
      const response = await axios(`/groceries`, {
        method: "post",
        data: payload,
      });
      toast.success("Item added successfully");
      setOpenList(false);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCart = (item, qty) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let canAddToCart = canItemBeAddedToCart(item);

    if (qty == 0) {
      toast.error("Pls add a quantity");
    } else {
      if (canAddToCart) {
        const payload = {
          userId: user && user._id ? user._id : "",
          storeId: "",
          store_name: "",
          itemId: item._id,
          quantity: qty,
          item_price: item.item_price,
          currency: "$",
          item_image: item.itemImage0,
          itemName: item.item_name,
          item_type: item.item_type ? item.item_type : "Meal",
        };
        try {
          dispatch(addToCart(payload));
          setOpenList(false);
          setShow(false);
          setOpenModal(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [uniqueItemIds, setUniqueItemIds] = useState(new Set());

  const fetchMeals = async (page = 1, other) => {
    try {
<<<<<<< HEAD
      const response = await axios(
        `/items/${page ? page : currentPage
        }?type=Meal&status=Public&limit=4&average_rating=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
=======
      const response = await axios(`/items/${page ? page : currentPage}`, {
        method: "GET",
        params: {
          type: "Meal",
          state: "Public",
          limit: 4,
          average_rating: 1,
          ...other,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
>>>>>>> 69e7f80d24039fbfad569cae17e6ec6b59381aba
      const totalItems = response.data.data.count;
      const allItems = response.data.data.items;
      const newItems = allItems.filter((item) => !uniqueItemIds.has(item._id));

     
      setMeals((prev) => {
        if (page === 1) {
          return allItems;
        } else {
          return [...prev, ...allItems];
        }
      });
      setCurrentPage((prev) => {
        if (page === 1) {
          return 1;
        } else {
          return prev + 1;
        }
      });

      ref.current = saleTypeRef.current;
      setUniqueItemIds(
        new Set([...uniqueItemIds, ...newItems.map((item) => item._id)])
      );
      setHasMoreData(totalItems > page * 4);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = useCallback(async () => {
    const keys = {
      item_price: saleType === "For sale" ? 1 : 0,
    };
    if (saleType === "Show all") {
      delete keys.item_price;
    }
    await fetchMeals(currentPage + 1, keys);
  }, [currentPage, saleType]);

  useEffect(() => {
    fetchMeals();
  }, []);
  const fetchGroceryList = async () => {
    try {
      const response = await axios(`/groceries/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSelectGrocery(response.data.data.data);
    } catch (error) { }
  };
  useEffect(() => {
    fetchGroceryList();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    const targetId = hash ? hash.substring(1) : "store";

    if (targetId) {
      scroller.scrollTo(targetId, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -1000,
      });
    }
  }, []);

  const handleAdd = (type) => {
    setSaleType(type);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        ref.current &&
        typeof ref.current?.contains === "function" &&
        !ref.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={styles.mealContainer}>
      <div className={styles.topcontainer1}>
        <Element
          id="store"
          name="store"
          style={{ fontSize: "2rem", marginBottom: "1rem" }}
        >
          Popular Meals
        </Element>
        <div className={styles.filter}>
          <p>Filter by: {saleType.toString()}</p>
          <BiSolidDownArrow
            onClick={() => setIsOpen(true)}
            color="rgba(109, 109, 109, 0.5)"
            size={15}
          />
          {isOpen && (
            <div ref={ref} className={styles.saleType}>
              <div className={styles.flexer}>
                <input
                  checked={saleType.includes("For sale")}
                  type="radio"
                  name="sale"
                  onChange={() => handleAdd("For sale")}
                  id="for_sale"
                />
                <label htmlFor="for_sale">For sale</label>
              </div>
              <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                <input
                  type="radio"
                  name="sale"
                  onChange={() => handleAdd("Not for sale")}
                  checked={saleType.includes("Not for sale")}
                  id="not_for_sale"
                />
                <label htmlFor="not_for_sale">Not for sale</label>
              </div>
              <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                <input
                  onChange={() => handleAdd("Show all")}
                  type="radio"
                  name="sale"
                  id="show_all"
                />
                <label htmlFor="show_all">Show all</label>
              </div>
              <button
                onClick={() => {
                  const keys = {
                    item_price: saleType === "For sale" ? 1 : 0,
                  };
                  if (saleType === "Show all") {
                    delete keys.item_price;
                  }
                  fetchMeals(1, keys);
                }}
                className={styles.saleBtn}
              >
                Apply filter
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.stores2}>
        {meals?.map((meal, idx) => {
          return (
            <div
              className={styles.card1}
              key={meal._id}
              onClick={() => {
                setSelectedItem(meal);
                setOpenModal(true);
                setSelectedItemId(meal._id);
              }}
            >
              {
                <div className={styles.box}>
                  <img
                    src={
                      meal?.itemImage0
                        ? meal?.itemImage0
                        : "/assets/store_pics/no-image-meal.png"
                    }
                    className={styles.storeImg1}
                  />
                  <div className={styles.flex}>
                    <p className={styles.name2}>{meal.item_name}</p>
                    <p>{convertCurrency(meal.item_price ? meal.item_price : 0)}</p>
                  </div>
                  <p className={styles.storeName}>Chop Chow Official Store</p>
                  <div className={styles.flex}>
                    <div>
                      {Array(5)
                        .fill("_")
                        .map((_, idx) => (
                          <GoStarFill
                            key={idx + _}
                            color={
                              meal.average_rating > idx
                                ? "#04D505"
                                : "rgba(0,0,0,0.5)"
                            }
                            style={{ marginLeft: ".2rem" }}
                          />
                        ))}
                    </div>
                    <p className={styles.prep}> 0 mins </p>
                  </div>
                </div>
              }
            </div>
          );
        })}
        {!matches ? (
          <Mealmodal
            openList={openList}
            openModal={openModal}
            selectGrocery={selectGrocery}
            selectedItem={selectedItem}
            selectedItemId={selectedItemId}
            setOpenList={setOpenList}
            setOpenModal={setOpenModal}
            show={show}
            details={details}
            setDetails={setDetails}
            addItemToGrocery={addItemToGrocery}
            setItemAdd={setItemAdd}
            setQuantity={setQuantity}
            quantity={quantity}
            setShow={setShow}
            addToCart={addItemToCart}
            serve={serve}
            setServe={setServe}
          />
        ) : (
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
            setQuantity={setQuantity}
            quantity={quantity}
            selectedItemId={selectedItemId}
            setShow={setShow}
            addToCart={addItemToCart}
            serve={serve}
            setServe={setServe}
          />
        )}
      </div>
<<<<<<< HEAD
      <p className={styles.view} onClick={hasMoreData ? loadMore : () => { }}>
        View More
      </p>
=======
      {hasMoreData && (
        <p className={styles.view} onClick={loadMore}>
          View More
        </p>
      )}
>>>>>>> 69e7f80d24039fbfad569cae17e6ec6b59381aba
      <div className={styles.border} />
    </div>
  );
};
