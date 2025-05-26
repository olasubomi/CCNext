import { useState, useEffect, useCallback } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ProductModal } from "../modal/individual-meal-product";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { canItemBeAddedToCart } from "../../util/canAddToCart";
import { useDispatch } from "react-redux";
import { MobileSearch } from "../dropdown/mobile-search";
import { ProductSearch } from "../dropdown/product-search";
import { convertCurrency } from "../../actions/utils";

export const AllProducts = () => {
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

  const handleActiveLetter = (elem, id) => {
    setActiveLetter(id);
    fetchProducts(currentPage, elem);
  };
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState({});
  const [openList, setOpenList] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(true);
  const [saleType, setSaleType] = useState("For sale");
  const [isOpen, setIsOpen] = useState(false);
  //items to add
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

  const addItemToCart = (item, qty) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const canAddToCart = canItemBeAddedToCart(item);
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

  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });

  const fetchProducts = async (page, other) => {
    try {
      const response = await axios(`/items/${page ? page : currentPage}`, {
        method: "GET",
        params: {
          type: "Product",
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

      setProducts((prev) => {
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

      setHasMoreData(totalItems > currentPage * 8);
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
    const targetId = hash ? hash.substring(1) : "product";

    // Scroll to the target section
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className={styles.top}>
        <div className={styles.marketplace}>
          <h1>Products</h1>
        </div>
        <div className={styles.topcontainer}>
          <p className={styles.marketplaceText}>
            You no longer have to deal with the local stores running out of
            stock of your favorite products when you can find them here.
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
                    name="for_sale_product"
                    onChange={() => handleAdd("For sale")}
                    id="for_sale_product"
                  />
                  <label htmlFor="for_sale_product">For sale</label>
                </div>
                <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                  <input
                    checked={saleType.includes("Not for sale")}
                    id="for_not_sale_product"
                    type="radio"
                    name="for_not_sale_product"
                    onChange={() => handleAdd("Not for sale")}
                  />
                  <label htmlFor="for_not_sale_product">Not for sale</label>
                </div>
                <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                  <input
                    id="for_show_all_sale_product"
                    onChange={() => handleAdd("Show all")}
                    type="radio"
                    name="for_show_all_sale_product"
                    checked={saleType.includes("Show all")}
                  />
                  <label htmlFor="for_show_all_sale_product">Show all</label>
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
          <ProductSearch setShowDropdown={setShowDropdown} />
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
              <img src="/assets/products/popular-product.jpeg" />
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
      <div className={styles.mealContainer1}>
        <div className={styles.stores3}>
          {products?.map((product, idx) => {
            console.log(product.item_name, product?.itemImage0, "pp");

            return (
              <div
                className={styles.card1}
                key={idx}
                onClick={() => {
                  setSelectedItem(product);
                  setOpenModal(true);
                }}
              >
                <div className={styles.box}>
                  <img
                    src={
                      product?.itemImage0
                        ? product?.itemImage0
                        : "/assets/store_pics/no-image-product.png"
                    }
                    className={styles.storeImg2}
                  />
                  <div className={styles.flex}>
                    <p className={styles.name2}>{product.item_name}</p>
                    <p>
                      {
                        product?.inventories?.[0]?.meal_price?.find(
                          (ele) => ele.price === product.item_price
                        )?.currency || '$'
                      }{product.item_price ? product.item_price : 0}
                    </p>
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
                              product.average_rating > idx
                                ? "#04D505"
                                : "rgba(0,0,0,0.5)"
                            }
                            style={{ marginLeft: ".2rem" }}
                          />
                        ))}
                    </div>
                    <p className={styles.prep}> 23 mins </p>
                  </div>
                </div>
              </div>
            );
          })}
          <ProductModal
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
            setShow={setShow}
            quantity={quantity}
            setQuantity={setQuantity}
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
          {[1, 2, 3].map((pageNumber) => (
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
