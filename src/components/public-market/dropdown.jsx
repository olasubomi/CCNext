import styles from "../../components/public-market/public-market.module.css";
import { useState } from "react";
import { GrStar } from "react-icons/gr";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaLocationDot,FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const MealDropDown = ({ selectedStore, id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const router = useRouter();

  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType } 
    } = rest;
    console.log('CustomRightArrow clicked');
    // onMove means if dragging or swiping in progress.
    return <div onClick={() => onClick()} className={styles.arrow}>
        <IoIosArrowRoundForward color="#FFF" />
    </div>;
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType } 
    } = rest;
    console.log('left clicked');
    // onMove means if dragging or swiping in progress.
    return <div onClick={() => onClick()} className={styles.arrow2}>
        <IoIosArrowRoundBack color="#FFF" />
    </div>;
  };
  
  console.log(selectedStore, "selectedItem");
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCard2}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div className={styles.round}>
            <AiOutlineClose />
          </div>
        </div>
        <div className={styles.store_flex}>
          <div className={styles.profile_picture}>
            <img src={selectedStore.supplier.profile_picture} />
          </div>
          <div>
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
              <FaLocationDot fill="#F47900" />
              <p className={styles.text} style={{ marginLeft: ".4rem" }}>
                6391 Elgin St. Celina, Delaware 10299
              </p>
            </div>
            <h6 className={styles.title2}>About Store</h6>
            <p className={styles.text}>
              For athletes, high altitude produces two contradictory effects on
              performance. For explosive events (sprints up to 400 metres, long
              jump, triple jump) the reduction in atmospheric pressure
            </p>
          </div>
        </div>
        <Carousel 
        responsive={responsive}
         className={styles.carousel} 
         customRightArrow={<CustomRightArrow/>}
         customLeftArrow={<CustomLeftArrow />}>
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
        {openModal && (
          <div className={styles.modalContainer}>
            <div className={styles.modalCard}>
              <div className={styles.flexed}>
                <div className={styles.images}>
                  <img
                    src={selectedItem?.itemImage0}
                    alt=""
                    className={styles.modalImg}
                  />
                  <div className={styles.images1}>
                    {selectedItem.item_images.map((image, idx) => {
                      return (
                        <div className={styles.img1}>
                          <img src={image} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.flex3}>
                    <h6 className={styles.itemName}>
                      {selectedItem.item_name}
                    </h6>
                    <div
                      className={styles.round}
                      onClick={() => setOpenModal(false)}
                    >
                      {" "}
                      <AiOutlineClose />
                    </div>
                  </div>
                  <p className={styles.storeName}>
                    {" "}
                    From {selectedItem.store_name}
                  </p>
                  <div className={styles.rates}>
                    {Array(5)
                      .fill("_")
                      .map((_, idx) => (
                        <GrStar
                          size={20}
                          key={idx + _}
                          color={
                            selectedItem.average_rating > idx
                              ? "#04D505"
                              : "rgba(0,0,0,0.5)"
                          }
                        />
                      ))}
                  </div>
                  <p className={styles.intro}>{selectedItem.item_intro}</p>
                  <div>
                    <h4 className={styles.modalTitle}>Product Category</h4>
                    <p className={styles.intro} style={{ marginTop: "-.5rem" }}>
                      portable, food, great
                    </p>
                  </div>
                  <div>
                    <h4 className={styles.modalTitle2}>Quantity</h4>
                    <div className={styles.flex2}>
                      <p className={styles.box}>-</p>
                      <p>2</p>
                      <p className={styles.box}>+</p>
                    </div>
                    <div>
                      <h4 className={styles.modalTitle2}>Available Quantity</h4>
                      <p
                        className={styles.intro}
                        style={{ marginTop: "-.5rem" }}
                      >
                        43 left
                      </p>
                    </div>
                    <div className={styles.end}>
                      <h4
                        className={styles.modalTitle}
                        style={{ marginRight: "6.3rem" }}
                      >
                        Price
                      </h4>
                      <span className={styles.span}>
                        {" "}
                        <h2
                          style={{ display: "flex", alignItems: "center" }}
                          className={styles.price}
                        >
                          <BsCurrencyDollar /> {selectedItem.item_price}
                        </h2>
                        <p className={styles.piece}> /piece</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.border} />
              <div className={styles.buttons}>
                <button className={styles.outlinebtn}>
                  <Link href={`/meal/${selectedItem.item_name}`}>
                    View More
                  </Link>
                </button>
                <button className={styles.outlinebtn}>
                  Add to Grocery List
                </button>
                <button className={styles.btn}>Add to Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
