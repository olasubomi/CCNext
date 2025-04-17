import { useState, useEffect, useRef, useCallback } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ProductModal } from "../modal/individual-meal-product";
import { Element } from "react-scroll";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions";
import { canItemBeAddedToCart } from "../../util/canAddToCart";
import { convertCurrency } from "../../actions/utils";
import { BiSolidDownArrow } from "react-icons/bi";

export const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState({});
  const [openList, setOpenList] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [saleType, setSaleType] = useState("For sale");
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [previousSaleType, setPreviousSaleType] = useState("");

  //items to add
  const [itemToAdd, setItemAdd] = useState({
    listName: "",
  });

  // const loadMore = () => {
  //   setVisibleProducts(visibleProducts + 5);
  // };

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

  // Generate a random integer between a specified range
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Example usage to generate an ID between 1 and 1000
  let randomId = getRandomInt(1, 1000);

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
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

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
    fetchProducts();
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

  const handleAdd = (type) => {
    setSaleType(type);
  };

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
    <div className={styles.mealContainer1}>
      <div className={styles.topcontainer1}>
        <Element
          name="product"
          style={{ fontSize: "2rem", marginBottom: "1rem" }}
        >
          Top Selling Products
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
                  name="for_sale_product"
                  onChange={() => handleAdd("For sale")}
                  id="for_sale_product"
                />
                <label htmlFor="for_sale_product">For sale</label>
              </div>
              <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                <input
                  checked={saleType.includes("Not for sale")}
                  id="not_for_sale_product"
                  type="radio"
                  name="for_sale_product"
                  onChange={() => handleAdd("Not for sale")}
                />
                <label htmlFor="not_for_sale_product">Not for sale</label>
              </div>
              <div className={styles.flexer} style={{ paddingTop: "15px" }}>
                <input
                  id="for_sale_product"
                  onChange={() => handleAdd("Show all")}
                  type="radio"
                  name="for_sale_product"
                />
                <label htmlFor="for_sale_product">Show all</label>
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
      <div className={styles.stores3}>
        {products?.map((product, idx) => {
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
                      : "assets/store_pics/no-image-product.png"
                  }
                  className={styles.storeImg2}
                />
                <div className={styles.flex}>
                  <p className={styles.name2}>{product.item_name}</p>
                  <p>{convertCurrency(product?.item_price ? product.item_price : "0.00")}</p>
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
      <p className={styles.view} onClick={hasMoreData ? loadMore : () => { }}>
        View More
      </p>
      <div className={styles.border} />
    </div>
  );
};
