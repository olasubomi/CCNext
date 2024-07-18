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

  const [activeLetter, setActiveLetter] = useState(null);

  const handleActiveLetter = (id) => {
    setActiveLetter(id);
  };
  const matches = useMediaQuery("(min-width: 920px)");
  const [meals, setMeals] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(8);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const ref = useRef(null);

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
  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });

  const fetchMeals = async () => {
    try {
      const response = await axios(`/items/1?type=Meal&status=all&limit=1000`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    <>
      <div className={styles.top}>
        <div className={styles.marketplace}>
          <h1>Meals</h1>
        </div>
        <div className={styles.topcontainer}>
          <p className={styles.marketplaceText}>
            Unlock global flavors with ease! Our app makes cooking international
            dishes a breeze, guiding you with expert tips and step-by-step
            instructions.
          </p>
          <div className={styles.flexItems}>
            <div className={styles.filter}>
              <p>Filter by: Cook Time</p>
              <BiSolidDownArrow color="rgba(109, 109, 109, 0.5)" size={15} />
            </div>
            <div className={styles.filter}>
              <p>Sort: Name A-Z</p>
              <BiSolidDownArrow color="rgba(109, 109, 109, 0.5)" size={15} />
            </div>
          </div>
        </div>
        <div className={styles.alphabetContainer}>
          {alphabets.map((elem, index) => (
            <span
              onClick={() => handleActiveLetter(index)}
              className={
                activeLetter === index ? styles.activespan : styles.inactivespan
              }
            >
              <p
                className={
                  activeLetter === index
                    ? styles.activeLetter
                    : styles.inactiveletter
                }
              >
                {elem}
              </p>
            </span>
          ))}
        </div>
      </div>
      <div className={styles.mealContain}>
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
            />
          )}
        </div>
        <p className={styles.view} onClick={() => loadMore()}>
          View More
        </p>
        <div className={styles.border} />
      </div>
    </>
  );
};
