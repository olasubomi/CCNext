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
import { addToCart } from "../../actions";
import { useDispatch } from "react-redux";

export const PopularMeals = () => {
  const matches = useMediaQuery("(min-width: 920px)");
  const [meals, setMeals] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(8);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [serve, setServe] = useState(0);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const loadMore = () => {
    setVisibleMeals(visibleMeals + 4);
  };
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

  // Generate a random integer between a specified range
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// Example usage to generate an ID between 1 and 1000
//let randomId = getRandomInt(1, 1000);

const addItemToCart = (item, qty) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if(qty == 0 ){
    toast.error("Pls add a quantity");
  }else{
     const payload = {
      userId: (user && user._id) ? user._id : "",
      storeId : "",
      store_name: "",
      itemId : item._id,
      quantity: qty,
      item_price: item.item_price,
      currency: "$",
      item_image: item.item_images[0],
      itemName: item.item_name,
      item_type:  item.item_type? item.item_type : "Meal",
  } 
  console.log(payload, "Cart payload line 76 top-selling-product");
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
  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });

  const fetchMeals = async () => {
    try {
      const response = await axios(
        `/items/1?type=Meal&status=Public&limit=1000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data.items, "ressw");
      setMeals(response.data.data.items);
    } catch (error) {
      console.log(error);
    }
  };
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
      console.log(response.data.data.data, "groceries");
      setSelectGrocery(response.data.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchGroceryList();
  }, []);
  const filteredMeals = meals.filter(
    (meal) => meal.item_type === "Meal" && meal.average_rating
  );
  console.log(filteredMeals, "fill");

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
  return (
    <div className={styles.mealContainer}>
      <Element
        id="meal"
        name="meal"
        style={{ fontSize: "2rem", marginBottom: "1rem" }}
      >
        Popular Meals
      </Element>
      <div className={styles.stores2}>
        {filteredMeals
          .slice(0, visibleMeals)
          .filter((meal) => Boolean(meal.total_rating))
          .map((meal, idx) => {
            return (
              <div
                className={styles.card1}
                key={idx}
                onClick={() => {
                  setSelectedItem(meal);
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
                      <p>${meal.item_price ? meal.item_price : "0"}</p>
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
            setShow={setShow}
            addToCart={addItemToCart}
            serve={serve}
            setServe={setServe}
          />
        )}
      </div>
      <p className={styles.view} onClick={() => loadMore()}>
        View More
      </p>
      <div className={styles.border} />
    </div>
  );
};
