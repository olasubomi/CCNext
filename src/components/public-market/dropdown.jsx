import styles from "../../components/public-market/public-market.module.css";
import { useState, useEffect } from "react";
import { GrStar } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { FaLocationDot } from "react-icons/fa6";
import { useMediaQuery } from "../../hooks/usemediaquery";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IndividualModal } from "../modal/individual-meal-product";
import { Mealmodal } from "../mobile/meal-modal";
import axios from "../../util/Api";
import { toast } from "react-toastify";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },

  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const MealDropDown = ({ selectedStore, setIsShow, storeInfo, id }) => {
  const matches = useMediaQuery("(min-width: 920px)");
  const [selectGrocery, setSelectGrocery] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [show, setShow] = useState(false);
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

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    console.log("CustomRightArrow clicked");
    // onMove means if dragging or swiping in progress.
    return (
      <div onClick={() => onClick()} className={styles.arrow}>
        <IoIosArrowRoundForward color="#FFF" />
      </div>
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    console.log("left clicked");
    // onMove means if dragging or swiping in progress.
    return (
      <div onClick={() => onClick()} className={styles.arrow2}>
        <IoIosArrowRoundBack color="#FFF" />
      </div>
    );
  };

  console.log(selectedStore, "selectedItem");
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCard2}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className={styles.round} onClick={() => setIsShow(false)}>
            <AiOutlineClose />
          </div>
        </div>
        <div className={styles.store_flex}>
          <div className={styles.profile_picture}>
            <img
              src={
                storeInfo?.image
                  ? storeInfo?.image
                  : "/assets/store_pics/no-image-store.png"
              }
            />
          </div>
          <div className={styles.rightside}>
            <div>
              <h4 className={styles.storeName2}>{storeInfo?.name}</h4>
              <div className={styles.rating}>
                {Array(5)
                  .fill("_")
                  .map((_, idx) => (
                    <GrStar
                      key={idx + _}
                      color={
                        storeInfo?.average_rating > idx
                          ? "#04D505"
                          : "rgba(0,0,0,0.5)"
                      }
                      className={styles.rate}
                    />
                  ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <FaLocationDot fill="#F47900" size={20} />
              <p className={styles.text} style={{ marginLeft: ".4rem" }}>
                {storeInfo?.address}
              </p>
            </div>
            <h6 className={styles.title2}>About Store</h6>
            <p className={styles.text}>{storeInfo?.description}</p>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          className={styles.carousel}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {selectedStore?.inventory?.map((meal, idx) => {
            return (
              <div
                className={styles.mealCard}
                onClick={() => {
                  setSelectedItem(meal.item);
                  setOpenModal(true);
                }}
              >
                <img
                  src={
                    meal?.item?.itemImage0
                      ? meal.item.itemImage0
                      : !meal?.item?.itemImage0 &&
                        meal?.item?.item_type === "Meal"
                      ? "/assets/store_pics/no-image-meal.png"
                      :!meal?.item?.itemImage0 && meal?.item?.item_type === "Product"
                      ? "/assets/store_pics/no-image-product.png"
                      : !meal?.item?.itemImage0 && meal?.item?.item_type === "Utensil"
                      ? "/assets/store_pics/no-image-utensil.png"
                      : ""
                  }
                  alt=""
                  className={styles.img}
                />

                <div className={styles.flex}>
                  <p className={styles.name}>{meal?.item?.item_name}</p>
                  <p className={styles.name2}>
                    {" "}
                    {meal?.item?.item_price
                      ? meal?.storeId?.currency?.symbol +
                        `${meal?.item?.item_price}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </Carousel>
        <hr />
        <div className={styles.button_left}>
          <button
            className={styles.view}
            onClick={() => router.push(`/store/${id}`)}
          >
            View Store
          </button>
        </div>
        {openModal && selectedItem?.item_type === "Meal" && (
          <div>
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
        )}
      </div>
    </div>
  );
};
