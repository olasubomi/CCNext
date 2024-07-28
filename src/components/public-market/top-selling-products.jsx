import { useState, useEffect } from "react";
import axios from "../../util/Api";
import styles from "./stores.module.css";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ProductModal } from "../modal/individual-meal-product";
import { Element } from "react-scroll";
import productImg from "../../../public/assets/store_pics/no-image-product.png";

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

  //items to add
  const [itemToAdd, setItemAdd] = useState({
    listName: "",
  });

  const loadMore = () => {
    setVisibleProducts(visibleProducts + 5);
  };

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
  const fetchProducts = async () => {
    try {
      const response = await axios(
        `/items/1?type=Product&status=Public&limit=1000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data.items, "ressee");
      const filteredProducts = response.data.data.items.filter(
        (item) => item.item_type === "Product" && item.average_rating
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };
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

  console.log(products, "products");
  return (
    <div className={styles.mealContainer1}>
      <Element
        name="product"
        style={{ fontSize: "2rem", marginBottom: "1rem" }}
      >
        Top Selling Products
      </Element>
      <div className={styles.stores3}>
        {products
        ?.slice(0, visibleProducts)
        ?.map((product, idx) => {
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
                  <p>{product?.item_price ? product.item_price : "$0.00"}</p>
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
        />
      </div>
      <p className={styles.view2} onClick={() => loadMore()}>
        View More
      </p>
      <div className={styles.border} />
    </div>
  );
};
