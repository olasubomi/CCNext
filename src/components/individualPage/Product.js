import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import styles2 from "./meal.module.css";
import modalStyles from "../public-market/stores.module.css";
import { FaReddit } from "react-icons/fa";
import Head from "next/head";
import Image from "next/image";
import {
  FacebookEIcon,
  PrintEIcon,
  ShareIcon,
  TwitterEIcon,
  WhatsappEIcon,
} from "../icons";
import Stores from "./stores";
import Reviews from "./Reviews";
import { GoStarFill } from "react-icons/go";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { useSearchParams } from "next/navigation";
import { addToCart } from "../../actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { canItemBeAddedToCart } from "../../util/canAddToCart";
import { AiOutlineClose } from "react-icons/ai";
import axios from "../../util/Api";
import { Modal } from "../modal/popup-modal";
import { RejectionModal } from "../modal/rejection-modal";

function Product(props) {
  const [formatted_ingredients, set_formatted_ingredients] = useState([""]);
  //const url = 'http://localhost:3000/'
  const url = "https://www.chopchow.app/";
  const productName = props?.product?.item_name;
  const productNameWithoutSpaces = productName?.replaceAll(" ", "%20");
  const productURL =
    "https://www.chopchow.app/product/" + productNameWithoutSpaces;
  const params = useSearchParams();
  // console.log(props.product.item_data.product_size, 'item_data')
  // console.log(props.product.item_data.product_size?.map((elem, id) => (
  //     <div key={id}>
  //         <p>{elem}</p>
  //     </div>
  // )), 'hellooo')
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("props", props.product);
    if (props.product.formatted_ingredients) {
      set_formatted_ingredients(props.product.formatted_ingredients);
    }
  }, [props.product.formatted_ingredients]);
  console.log(props.product.item_images, "image");
  const [openList, setOpenList] = useState(false);
  const [show, setShow] = useState(false);
  const [selectGrocery, setSelectGrocery] = useState([]);
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState({
    listName: "",
    description: "",
    id: "",
    status: "",
  });

  const [itemToAdd, setItemAdd] = useState({
    listName: "",
  });

  const addItemToGrocery = async (listName) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const itemToUse = selectedItem._id ? selectedItem : props.product;
    const payload = {
      userId: user._id,
      groceryList: {
        listName: itemToAdd.listName || listName,
        groceryItems: {
          itemId: itemToUse._id,
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
    } catch (error) { }
  };
  useEffect(() => {
    fetchGroceryList();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setUser(user);
  }, []);
  return (
    <>
      <Head>
        <title>Product</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:description" content={props.product.item_intro} />
        <meta name="twitter:image" content={props.product.itemImage0} />
        <meta name="twitter:image:alt" content={props.product.item_name} />

        <meta property="og:title" content={props.product.item_name} />
        <meta property="og:description" content={props.product.item_intro} />
        <meta property="og:image" content={props.product.itemImage0} />
        <meta property="og:image:alt" content={props.product.item_name} />
      </Head>
      <div className={styles.product_sections}>
        <div className={styles.product_section_2}>
          <div className={styles.product_section_2_col_1}>
            <div className={styles.product_section_2_main_img}>
              <img
                src={props.product.itemImage0}
                alt={props.product.item_name}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <div className={styles.product_section_2_images}>
              {props.product.item_images?.length > 1 && (
                <>
                  {props.product.item_images.map((image, index) => (
                    <div className={styles.product_section_2_image}>
                      <img key={index} src={image} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className={styles.product_section_2_col_2}>
            <div className={styles.product_section_2_details}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h2 className={styles.product_section_2_name}>
                  {props.product.item_name}
                </h2>
                <div style={{ marginTop: "1rem", marginBottom: "-1rem" }}>
                  {Array(5)
                    .fill("_")
                    .map((_, idx) => (
                      <GoStarFill
                        key={idx + _}
                        color={
                          props.product.average_rating > idx
                            ? "#04D505"
                            : "rgba(0,0,0,0.5)"
                        }
                      />
                    ))}
                </div>
              </div>
              {/* <div className={styles.store}>
                                <h4>Chop Chow Store</h4>
                                <div>
                                    <LocationIcon style={styles.store_icon} />
                                    <p>6391 Elgin St. Celina, Delaware 10299</p>
                                </div>
                            </div> */}
              {/* <p className={styles.product_section_2_description}>
                                {props.product.product_name}
                            </p> */}
              <p>{props.product.item_intro}</p>
              <div className={styles.product_section_2_details_col}>
                <div className={styles.product_section_2_categories}>
                  <h3 className={styles.product_section_2_category_name}>
                    Category
                  </h3>

                  <p className={styles.product_section_2_category}>
                    {props.product.item_categories?.map((cat, j) => (
                      <span key={j}>{cat.category_name} &nbsp; &nbsp;</span>
                    ))}
                  </p>
                </div>
                <div className={styles.product_section_2_categories}>
                  <h3 className={styles.product_section_2_category_name}>
                    Product size
                  </h3>
                  <p className={styles.product_section_2_category}>
                    {props.product.product_size && (
                      <p>{props.product.product_size}</p>
                    )}
                  </p>
                </div>
              </div>
            </div>
            {props.product.item_available && (
              <div className={styles.product_section_2_price}>
                <h3>Price</h3>
                <p>
                  ${props.product.item_price}
                  <span>/piece</span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.section_2_footer}>
          <div className={styles.hide}>
            <p>
              <ShareIcon />
              Share this product:
            </p>
            <FacebookShareButton
              url={productURL}
              quote={props.product.item_name}
              hashtag={props.product.item_intro}
            >
              <FacebookEIcon />
            </FacebookShareButton>
            <TwitterShareButton
              title={props.product.item_name}
              via="ChopChowMarket"
              url={productURL}
            >
              <TwitterEIcon />
            </TwitterShareButton>
            {/* <InstagramShareButton title={props.meal.item_name} url="https://www.instagram.com">
                                    <InstaEIcon />
                                </InstagramShareButton> */}
            <WhatsappShareButton title={props.product.item_name} url={productURL}>
              <WhatsappEIcon />
            </WhatsappShareButton>
           <RedditShareButton
                title={props.product.product_name}
                url={productURL}
              >
                <div className={styles.redditicon}>
                  <FaReddit color="#FF4500" size={20} />
                </div>
              </RedditShareButton>
          </div>
          <div className={styles.hide} style={{marginLeft: '3px'}}>
            <p>Print Preview</p>
            <PrintEIcon />
          </div>
          {props.product.item_status?.find((ele) => ele.status === "Public") &&
            props?.auth?.authUser?.user_type !== "admin" && (
              <div className={styles.btnGroup}>
                <div
                  className={styles.btnoutline}
                  onClick={() => {
                    setOpenList(true);
                    setSelectedItem(props?.product);
                  }}
                >
                  Add to Grocery List
                </div>
                <div
                  className={styles.btnfill}
                  onClick={() => addItemToCart(props.product, 1)}
                >
                  Add to Cart
                </div>
              </div>
            )}
        </div>

        {/* <div className={styles.productcard_row}>
                    <div className={styles.productcard_col_1}>
                        <h3>Featured In</h3>
                    </div>
                    <div className={styles.productcard_col_2}>
                        <div className={styles.productcard_productcards}>
                            {new Array(1,2,3,4,5,6,7,8).map((data, index) => {
                                return(
                                <div key={index} className={styles.productcard_productcard}>
                                    <div className={styles.productcard_productcard_img_container}>

                                    <Image
                                        priority
                                        src={img_logo}
                                        alt="Store"
                                        className={styles.productcard_productcard_img}
                                    />
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        <h6 className={styles.productcard_productcard_name}>TagIcon</h6>
                                        <p className={styles.productcard_productcard_duration}>
                                            7 min
                                        </p>
                                    </div>
                                    <div className={styles.productcard_productcard_col}>
                                        <div className={styles.product_review_rating_icons}>
                                            {
                                                Array.from({ length: 5 }).map((i,j) => {
                                                    var rate = 4;
                                                    if((j+1) <= rate){
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon} />
                                                        )
                                                    }else{
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon2} />
                                                        )}
                                                })
                                            }
                                        </div>
                                        <p className={styles.productcard_productcard_price}>
                                            $666
                                        </p>
                                    </div>
                                </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div> */}

        <div className={styles.product_section_8}>
          <h3>Product Ingredients</h3>
          <p>
            {props.product.ingredeints_in_item
              ?.map(
                (elem) =>
                  `${elem.item_name} (${elem.item_quantity}${elem.item_measurement})`
              )
              .join(", ")}
          </p>
        </div>
        <div className={styles.product_section_8}>
          <h3>Product Description</h3>
          {props?.product?.item_description?.length
            ? props.product.item_description.map((ele, idx) => (
              <div key={idx}>{ele?.formatted_string}</div>
            ))
            : "No description available"}
        </div>
        <div id="review" className={styles.product_section_8}>
          <h3>Stores location</h3>

          {props.product.stores_available?.length > 0 ? (
            <Stores />
          ) : (
            <p>Not Available</p>
          )}
        </div>

        <div className={styles.product_section_8}>
          <h3>Add Review</h3>
          <Reviews itemId={props.product._id} callback={props.callback} />
        </div>

        <div className={styles.productcard_row}>
          <div className={styles.productcard_col_1}>
            <h3>People Also Like</h3>
          </div>
          <div className={styles.productcard_col_2}>
            <div className={styles.productcard_productcards}>
              {props.product.product_alternatives?.map((data, index) => {
                return (
                  <div key={index} className={styles.productcard_productcard}>
                    <div
                      className={styles.productcard_productcard_img_container2}
                    >
                      {data.product_images &&
                        data.product_images.length > 0 &&
                        data.product_images[0].length > 0 &&
                        data.product_images[0] !==
                        "[object HTMLImageElement]" && (
                          <Image
                            priority
                            src={data.meal_images[0]}
                            alt="Store"
                            className={styles.productcard_productcard_img}
                          />
                        )}
                    </div>
                    <div className={styles.productcard_productcard_col}>
                      <h6 className={styles.productcard_productcard_name}>
                        {data.product_name}
                      </h6>
                    </div>
                    {/* <p>Chop Chow Official Store</p> */}
                    <div className={styles.productcard_productcard_col}>
                      {/* <div className={styles.product_review_rating_icons}>
                                            {
                                                Array.from({ length: 5 }).map((i,j) => {
                                                    var rate = 4;
                                                    if((j+1) <= rate){
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon} />
                                                        )
                                                    }else{
                                                        return(
                                                            <StarIcon style={styles.product_review_rating_icon2} />
                                                        )}
                                                })
                                            }
                                        </div> */}
                      {/* <p className={styles.productcard_productcard_duration}>
                                            7min
                                        </p> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {openList && (
          <div className={modalStyles.modalContainer}>
            {console.log("Modal is being rendered, openList:", openList)}
            <div className={modalStyles.modalCard3}>
              <div className={modalStyles.flex3}>
                <h4 className={modalStyles.addTitle}>Add Item to Grocery List</h4>
                <div onClick={() => setOpenList(false)} className={modalStyles.round}>
                  <AiOutlineClose />
                </div>
              </div>
              <div>
                {selectGrocery?.map((elem, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setItemAdd({ listName: elem.listName })}
                      className={modalStyles.list}
                    >
                      <input type="checkbox" />
                      <p>{elem.listName}</p>
                    </div>
                  );
                })}
              </div>
              <div className={modalStyles.flex} style={{ marginTop: "2rem" }}>
                <button onClick={addItemToGrocery} className={modalStyles.btn}>
                  Done
                </button>
                <button
                  className={modalStyles.outlinebtn}
                  onClick={() => {
                    setOpenList(false);
                    setShow(true);
                  }}
                >
                  Add to New List
                </button>
              </div>
            </div>
          </div>
        )}
        {show && (
          <Modal
            addItemToGrocery={addItemToGrocery}
            details={details}
            setDetails={setDetails}
            setShow={setShow}
            show={show}
          />
        )}
        {openModal && (
          <RejectionModal
            itemId={props?.product?._id ?? ""}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </>
  );
}

export default Product;
