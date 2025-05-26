import { useState, useEffect, useRef } from "react";
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
import { ScrollableElement } from "../smooth-scroll-link";
import mealImg from "../../../public/assets/store_pics/no-image-meal.png";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { MobileSearch } from "../dropdown/mobile-search";
import { MealSearch } from "../dropdown/meal-search";
import { convertCurrency } from "../../actions/utils";

export const AllPopularMeals = () => {
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);
  const [availableLetters, setAvailableLetters] = useState([]);

  const handleActiveLetter = (elem, id) => {
    setActiveLetter(id);
    fetchMeals(currentPage, elem);
  };
  const matches = useMediaQuery("(min-width: 920px)");
  const [meals, setMeals] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showDropdown, setShowDropdown] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [saleType, setSaleType] = useState("For sale");

  const ref = useRef(null);
  const [serve, setServe] = useState(0);
  const dispatch = useDispatch();

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

    console.log(payload, "payload");
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
  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });

  const addItemToCart = (item, qty) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (qty == 0) {
      toast.error("Pls add a quantity");
    } else {
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
  };

  // const fetchMeals = async (page) => {
  //   setIsLoading(true);
  //   const params = {};
  //   if (activeLetter) {
  //     params.startsWith = activeLetter;
  //   }
  //   try {
  //     const response = await axios(
  //       `/items/${page}?type=Meal&status=Public&limit=20`,
  //       {
  //         method: "GET",
  //         params: {
  //           ...params,
  //         },
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const totalItems = response.data.data.count;

  //     const allItems = response.data.data.items;

  //     const filteredItem = allItems.filter((product) => product.average_rating);

  //     const totalPages = Math.ceil(totalItems / 20);

  //     setMeals(filteredItem);
  //     setTotalPages(totalPages);
  //     const lettersWithStores = filteredItem.map((item) =>
  //       item.item_name[0].toUpperCase()
  //     );
  //     setAvailableLetters([...new Set(lettersWithStores)]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

 console.log(meals, 'mealsmeals')

  const fetchGroceryList = async () => {
    try {
      const response = await axios(`/groceries/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.data.data, "groceries");
      setSelectGrocery(response.data.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchGroceryList();
  }, []);

  const fetchMeals = async (page = 1, other) => {
    try {
      const response = await axios(`/items/${page ? page : currentPage}`, {
        method: "GET",
        params: {
          type: "Meal",
          state: "Public",
          limit: 4,
          // average_rating: 1,
          ...other,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const totalItems = response.data.data.count;
      const allItems = response.data.data.items;

      // const newItems = allItems.filter((item) => !uniqueItemIds.has(item._id));
      setMeals(allItems);
      setCurrentPage((prev) => {
        if (page === 1) {
          return 1;
        } else {
          return prev + 1;
        }
      });

      // setUniqueItemIds(
      //   new Set([...uniqueItemIds, ...newItems.map((item) => item._id)])
      // );
      // setHasMoreData(totalItems > page * 4);
    } catch (error) {
      console.log(error);
    }
  };

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
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAdd = (type) => {
    setSaleType(type);
  };
  useEffect(() => {
    fetchMeals(1, { item_price: 1 });
  }, []);
  console.log(meals, "Mels")

  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsOpen(false);
        }
      },
      true
    );
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div className={styles.marketplace}>
          <h1>Meals</h1>
        </div>
        <div className={styles.topcontainer}>
          <p className={styles.marketplaceText}>
            Find and replicate recipes of meals from all over the world.
          </p>
          <div className={styles.filter}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen(true)}
            >
              <p>Filter by: {saleType.toString()}</p>
              <BiSolidDownArrow color="rgba(109, 109, 109, 0.5)" size={15} />
            </div>
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
                    checked={saleType.includes("Show all")}
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
        <div className={styles.searchbar}>
          <MealSearch setShowDropdown={setShowDropdown} />
        </div>
        <div className={styles.alphabetContainer}>
          <div className={styles.alphabetContainer2}>
            {alphabets.map((elem, index) => (
              <span
                key={index}
                onClick={() => handleActiveLetter(elem, index)}
                className={
                  availableLetters.includes(elem)
                    ? activeLetter === index
                      ? styles.activespan
                      : styles.inactivespan
                    : styles.disabledspan
                }
              >
                <p
                  className={
                    availableLetters.includes(elem)
                      ? activeLetter === index
                        ? styles.activeLetter
                        : styles.inactiveletter
                      : styles.disabledLetter
                  }
                >
                  {elem}
                </p>
              </span>
            ))}
          </div>
        </div>
        <div className={styles.storeImgContainer}>
          <div className={styles.storeFlex}>
            <div className={styles.storediv}>
              <img src="/assets/meal_pics/popular-meal.jpeg" />
            </div>
            <div className={styles.storeDetails}>
              <h3>Sweet Sensations</h3>
              <p>
                At Sweet Sensations, we're dedicated to crafting irresistible
                treats that tantalize your taste buds and warm your heart. From
                decadent chocolate delights to delicate pastries, each creation
                is made with passion and precision
              </p>
              <p className={styles.storeLocation}>Accra- Ghana</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mealContain}>
        <div className={styles.stores2}>
          {meals
            // .filter((meal) => Boolean(meal.total_rating))
            .map((meal, idx) => {
              return (
                <div
                  className={styles.card1}
                  key={idx}
                  onClick={() => {
                    setSelectedItem(meal);
                    setSelectedItemId(meal._id);
                    setOpenModal(true);
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
                        <p>
                          {
                            meal?.inventories?.[0]?.meal_price?.find(
                              (ele) => ele.price === meal.item_price
                            )?.currency || '$'
                          }{meal.item_price ? meal.item_price : 0}
                        </p>
                      </div>
                      <p className={styles.storeName}>
                        Chop Chow Official Store
                      </p>
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
          )}
        </div>

        <div className={styles.paginationContainer}>
          <div
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={
              currentPage === 1 ? styles.disableButn : styles.paginationButton2
            }
          >
            <FaAngleLeft
              size={17}
              color={currentPage === 1 ? "#6D6D6D" : "#52575C"}
            />
          </div>
          {[1, 2, 3].map((pageNumber) => (
            <div
              key={pageNumber}
              className={
                currentPage === pageNumber
                  ? styles.activepaginationButton
                  : styles.paginationButton2
              }
              onClick={() => fetchMeals(pageNumber, { item_price: 1 })}
            >
              {pageNumber}
            </div>
          ))}
          <div onClick={handleNextPage} className={styles.paginationButton2}>
            <FaAngleRight size={17} />
          </div>
        </div>
      </div>
    </>
  );
};
