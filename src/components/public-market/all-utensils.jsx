import { useState, useEffect, useCallback } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import { UtensilModal } from "../modal/individual-meal-product";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { canItemBeAddedToCart } from "../../util/canAddToCart";
import { UtensilSearchs } from "../dropdown/utensil-search";

export const AllUtensils = () => {
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

  const [activeLetter, setActiveLetter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [availableLetters, setAvailableLetters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(true);


  const handleActiveLetter = (elem, id) => {
    setActiveLetter(id);
    fetchUtensils(currentPage, elem);
  };
  const [meals, setMeals] = useState([]);
  const [utensils, setUtensils] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(8);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [saleType, setSaleType] = useState(["For sale"]);
  const [isOpen, setIsOpen] = useState(false);

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


    const addItemToCart = (item, qty) => {
      const user = JSON.parse(localStorage.getItem("user"));
      let canAddToCart = canItemBeAddedToCart(item);

      if (qty == 0) {
        toast.error("Add a quantity");
      } else {
        if (canAddToCart) {
          const payload = {
            userId: user && user._id ? user._id : "",
            storeId: "",
            store_name: "",
            itemId: item._id,
            quantity: qty,
            item_price: item.item_price,
            currency: "",
            item_image: item.itemImage0,
            itemName: item.item_name,
            item_type: item.item_type ? item.item_type : "Product",
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

  const fetchUtensils = async (page, activeLetter) => {
    setIsLoading(true);
    const params = {};
    if (activeLetter) {
      params.startsWith = activeLetter;
    }
    try {
      const response = await axios(
        `/items/${page}?type=Utensil&status=Public&limit=10`,
        {
          method: "GET",
          params: {
            ...params,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const allItems = response.data.data.items;

      const filteredProducts = allItems.filter(
        (product) => product.average_rating
      );

      if (filteredProducts.length === 0) {
        const lastPageWithItems = page - 1;
        setTotalPages(lastPageWithItems);
      } else {
        setUtensils(filteredProducts);
      }
      const lettersWithStores = filteredProducts.map((item) =>
        item.item_name[0].toUpperCase()
      );
      setAvailableLetters([...new Set(lettersWithStores)]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchProducts = async (page, other) => {
    try {
      const response = await axios(`/items/${page ? page : currentPage}`, {
        method: "GET",
        params: {
          type: "Utensil",
          status: "Public",
          limit: 8,
          ...other,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const totalItems = response.data.data.count;
      const allItems = response.data.data.items;

      console.log({ allItems });

      // const filteredItems = allItems.filter((meal) => meal.average_rating);

      // const newItems = filteredItems.filter(
      //   (item) => !uniqueItemIds.has(item._id)
      // );

      setMeals((prev) => {
        if (page === 1) {
          return allItems;
        } else {
          return [...prev, ...allItems];
        }
      });
      // setCurrentPage((prev) => {
      //   if (page === 1) {
      //     return 1;
      //   } else {
      //     return prev + 1;
      //   }
      // });
      // setUniqueItemIds(
      //   new Set([...uniqueItemIds, ...newItems.map((item) => item._id)])
      // );

      // setHasMoreData(totalItems > currentPage * 8);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = useCallback(async () => {
    const keys = {
      item_price: saleType.includes("For sale") ? 1 : 0,
    };
    if (saleType === "Show all") {
      delete keys.item_price;
    }
    await fetchProducts(currentPage + 1, keys);
  }, [currentPage, saleType]);

  useEffect(() => {
    fetchProducts(1, { item_price: 1 });
  }, []);
  useEffect(() => {
    fetchUtensils(currentPage);
  }, [currentPage]);
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

  useEffect(() => {
    // Get the hash value from the URL
    const hash = window.location.hash;

    // Use the hash value as the target ID for scrolling
    const targetId = hash ? hash.substring(1) : "utensils";

    // Scroll to the target section
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  
  const addItemToCart = (item, qty) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (qty == 0) {
      toast.error("Add a quantity");
    } else {
      const payload = {
        userId: (user && user._id) ? user._id : "",
        storeId: "",
        store_name: "",
        itemId: item._id,
        quantity: qty,
        item_price: item.item_price,
        currency: "",
        item_image: item.itemImage0,
        itemName: item.item_name,
        item_type: item.item_type ? item.item_type : "Product",
      }
      console.log(payload, "Cart payload line 76 utensil");
      try {
        dispatch(addToCart(payload))
        setOpenList(false);
        setShow(false);
        setOpenModal(false);
      } catch (error) {
        console.log(error);
      }
    };


  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    }
  };
  return (
    <>
      <div className={styles.top}>
        <div className={styles.marketplace}>
          <h1>Kitchen Utensils</h1>
        </div>
        <div className={styles.topcontainer}>
          <p className={styles.marketplaceText}>
            Choose from our wide collection of tools to make your job in the
            kitchen easier.
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
                  onChange={() => handleAdd("For sale")}
                  id="for_sale"
                  name="sale"
                  type="radio"
                />
                <label htmlFor="for_sale">For sale</label>
              </div>
              <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                <input
                  onChange={() => handleAdd("Not for sale")}
                  checked={saleType.includes("Not for sale")}
                  id="not_for_sale"
                  name="sale"
                  type="radio"
                />
                <label htmlFor="not_for_sale">Not for sale</label>
              </div>
              <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                <input
                  onChange={() => {
                    handleAdd("Show all");
                  }}
                  id="show_all"
                  name="sale"
                  type="radio"
                />
                <label htmlFor="show_all">Show all</label>
              </div>
              <button
                onClick={() => {
                  const keys = {
                    item_price: saleType.includes("For sale") ? 1 : 0,
                  };
                  if (saleType === "Show all") {
                    delete keys.item_price;
                  }
                  fetchProducts(1, keys);
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
          <UtensilSearchs setShowDropdown={setShowDropdown} />
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
              <img src="/assets/products/popular-utensil.jpeg" />
            </div>
            <div className={styles.storeDetails}>
              <h3>Sweet Sensations</h3>
              <p>
                At Sweet Sensations, we're dedicated to crafting irresistible
                treats that tantalize your taste buds and warm your heart. From
                decadent chocolate delights to delicate pastries, each creation
                is made with passion and precision
              </p>
              <p className={styles.storeLocation}>Accra - Ghana</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mealContain}>
        <div className={styles.stores2}>
          {meals?.map((utensil, idx) => {
            return (
              <div
                className={styles.card1}
                key={idx}
                onClick={() => {
                  setSelectedItem(utensil);
                  setOpenModal(true);
                }}
              >
                {
                  <div className={styles.box}>
                    <img
                      src={
                        utensil?.itemImage0
                          ? utensil?.itemImage0
                          : "/assets/store_pics/no-image-utensil.png"
                      }
                      className={styles.storeImg1}
                    />
                    <div className={styles.flex}>
                      <p className={styles.name2}>{utensil.item_name}</p>
                      <p>$8.43</p>
                    </div>
                    <p className={styles.storeName}>Chop Chow Official Store</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: ".7rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        {Array(5)
                          .fill("_")
                          .map((_, idx) => (
                            <GoStarFill
                              key={idx + _}
                              color={
                                utensil.average_rating > idx
                                  ? "#04D505"
                                  : "rgba(0,0,0,0.5)"
                              }
                              style={{ marginLeft: ".2rem" }}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                }
              </div>
            );
          })}
          <UtensilModal
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
            setShow={setShow}
            addToCart={addItemToCart}
          />
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
          {[1, 2].map((pageNumber) => (
            <div
              key={pageNumber}
              className={
                currentPage === pageNumber
                  ? styles.activepaginationButton
                  : styles.paginationButton2
              }
              onClick={() => fetchProducts(pageNumber, { item_price: 1 })}
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
