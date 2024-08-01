import styles from "../../components/public-market/public-market.module.css";
import { useState, useEffect, useRef } from "react";
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
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions";

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

export const MealDropDown = ({ selectedStore, setIsShow, storeInfo, isShow, id }) => {
  const matches = useMediaQuery("(min-width: 920px)");
  const [selectGrocery, setSelectGrocery] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [serve, setServe] = useState(0);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()

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
    
    if(qty == 0 ){
      toast.error("Pls add a quantity");
    }else{
       const payload = {
        userId: (user && user._id) ? user._id : "",
        storeId : id,
        store_name: selectedStore.supplier.store_name,
        itemId : item._id,
        quantity: qty,
        item_price: item.item_price,
        currency: selectedStore.supplier.currency.symbol,
        item_image: item.item_images[0],
        itemName: item.item_name,
        item_type: item.item_type? item.item_type : "",
    } 
    console.log(payload, "Cart payload");
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
  const fetchGroceryList = async () => {
    try {
      const response = await axios(`/groceries/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log( "groceries line 91", response.data.data.data);
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
  const dropdownRef = useRef();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (isShow) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShow]);
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCard2} ref={dropdownRef}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className={styles.round} onClick={() => setIsShow(false)}>
            <AiOutlineClose />
          </div>
        </div>
        <div className={styles.store_flex}>
          <div className={styles.profile_picture}>
            <img src={selectedStore.supplier.profile_picture} />
          </div>
          <div className={styles.rightside}>
            <div>
              <h4 className={styles.storeName2}>
                {selectedStore.supplier.store_name}
              </h4>
              <div className={styles.rating}>
                {Array(5)
                  .fill("_")
                  .map((_, idx) => (
                    <GrStar
                      key={idx + _}
                      color={
                        selectedStore.supplier.average_rating > idx
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
              <FaLocationDot fill="#F47900" size={20}/>
              <p className={styles.text} style={{ marginLeft: ".4rem" }}>
                {selectedStore?.supplier?.supplier_address?.address}
              </p>
            </div>
            <h6 className={styles.title2}>About Store</h6>
            <p className={styles.text}>
             {selectedStore?.supplier?.description}
            </p>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          className={styles.carousel}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {selectedStore.items.map((meal, idx) => {
            return (
              <div
                className={styles.mealCard}
                onClick={() => {
                  setSelectedItem(meal);
                  setOpenModal(true);
                }}
              >
                <img src={meal?.itemImage0} alt="" className={styles.img} />
                <div className={styles.flex}>
                  <p className={styles.name}>{meal?.item_name}</p>
                  <p className={styles.name2}>
                    {" "}
                    {meal.item?.price ? "$" + `${meal?.item_price}` : "N/A"}
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
        {openModal && selectedItem.item_type === "Meal" && (
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
                addToCart={addItemToCart}
                serve= {serve}
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
                serve= {serve}
                setServe={setServe}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
