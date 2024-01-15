import React, { useState } from "react";
import styles from "./store.module.css";

import Head from "next/head";
import img_logo from "../../../public/assets/logos/sezzle.png";
import Image from "next/image";
import Reviews from "./Reviews";
import {
  CallIcon,
  EmailIcon,
  LocationIcon,
  StarIcon,
  TimeIcon,
} from "../icons";
import { GrStar } from "react-icons/gr";
import sale from "../../../public/assets/store_pics/sale.jpg";
import { FormModal } from "../modal/form-modal";
import { SuccessModal } from "../suggest-store/success-modal";
import { useRouter } from "next/navigation";

function Store(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const router = useRouter();

  function handleSearch(e) {
    // setSearchSuggestedMealState(e.target.value);
    // if(e.target.value.length>=1){
    //   let url = window.location.href;
    //   let value;
    //   value = { name: e.target.value }
    //   productSuggestion(value).then(res => {
    //     console.log(res)
    //     if(res.data.data.products){
    //       this.setState({
    //         queryResults: res.data.data.products.items
    //       })
    //     }
    //     if(res.data.data.products){
    //       this.setState({
    //         suggestionResults: res.data.data.products.items
    //       })
    //     }
    //   })
    // }
  }
  console.log(props, "props11");
  const filteredItem = () => {
    return props.items.filter((data) => data.item_type === "Meal");
  };
  const filteredProducts = () => {
    return props.items.filter((data) => data.item_type === "Product");
  };
  console.log(filteredProducts(), "filtered");
  return (
    <>
      <Head>
        <title>Store</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <div className={styles.store_sections}>
        {openModal && (
          <FormModal
            setOpenModal={setOpenModal}
            setOpenSuccessModal={setOpenSuccessModal}
            _id={props.store._id}
          />
        )}
        {openSuccessModal && (
          <SuccessModal
            storeId={props.store._id}
            title={`Submitted Successfully`}
            text={`Thank you for your submission, Our dedicated team will 
          now carefully review your claim. Rest assured, we'll keep you
           updated on the progress every step of the way.`}
            button2={true}
            btnTitle3={`Back to Store`}
            onClick={() => setOpenSuccessModal(false)}
          />
        )}
        <div className={styles.product_section_2}>
          <div className={styles.product_section_2_col_1}>
            <Image
              src={props.store.profile_picture}
              alt="pop up"
              className={styles.product_section_2_main_img}
              height={350}
              width={350}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className={styles.product_section_2_col_2}>
            <div className={styles.product_section_2_details}>
              <div className={styles.flex}>
                <h2 className={styles.product_section_2_name}>
                  {props.store.store_name}
                </h2>
                <div className={styles.rates}>
                  {Array(5)
                    .fill("_")
                    .map((_, idx) => (
                      <GrStar
                        size={23}
                        key={idx + _}
                        color={
                          props.store.average_rating > idx
                            ? "#04D505"
                            : "rgba(0,0,0,0.5)"
                        }
                      />
                    ))}
                </div>
                {props?.store?.hasOwnProperty("store_owner") ? null : (
                  <div className={styles.btns}>
                    <button
                      className={styles.btn}
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      Claim this Store
                    </button>
                    <button
                      className={styles.outlineBtn}
                      onClick={() => {
                        router.push(
                          `/dashboard/management?storeId=${props.store._id}`
                        );
                        console.log(props.store._id, "propsstore");
                      }}
                    >
                      Manage Store
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.store}>
                {props.store.supplier_address && (
                  <div>
                    <LocationIcon style={styles.store_icon} />
                    {/* <p>{JSON.parse(props?.store?.supplier_address)?.address + " " + JSON.parse(props?.store?.supplier_address)?.city + " ," + JSON.parse(props?.store?.supplier_address)?.state + " " + JSON.parse(props?.store?.supplier_address)?.country + " " + JSON.parse(props?.store?.supplier_address)?.zip_code}6391 Elgin St. Celina, Delaware 10299</p> */}
                    <p>{props?.store?.supplier_address?.address}</p>
                  </div>
                )}
                <div>
                  <EmailIcon style={styles.store_icon} />
                  <p>{props.store.email}</p>
                </div>
                <div>
                  <CallIcon style={styles.store_icon} />
                  <p>{props.store.phone_number}</p>
                </div>
              </div>
              <div className={styles.store}>
                <div>
                  <TimeIcon style={styles.store_icon} />
                  <p>Pickup: 8:00 am - 10:00am</p>
                  {/* <p>{props.store.hours[0]}</p> */}
                </div>
              </div>
              <div className={styles.product_section_2_categories}>
                <h3 className={styles.product_section_2_category_name}>
                  About Store
                </h3>
                <p className={styles.product_section_2_category}>
                  {props.store.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.products_con}>
          <div
            style={{
              width: "100%",
              borderBottom: ".5px solid rgba(0, 0, 0, 0.10);",
            }}
          ></div>
          <div className={styles.productcard_row}>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
              }}
            ></div>

            <div className={styles.productcard_col_1}>
              <h3>Meal</h3>
            </div>
            <div className={styles.productcard_col_2}>
              <div className={styles.productcard_productcards}>
                {filteredItem()
                  .slice(0, 6)
                  .map((data, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.productcard_productcard}
                      >
                        <div
                          className={
                            styles.productcard_productcard_img_container
                          }
                        >
                          <img
                            priority
                            src={data.itemImage0}
                            alt="Store"
                            className={styles.productcard_productcard_img}
                          />
                        </div>
                        <div className={styles.productcard_productcard_col}>
                          <h6 className={styles.productcard_productcard_name}>
                            {data.item_name}
                          </h6>
                          <p className={styles.productcard_productcard_price}>
                            {data.item_price ? data.item_price : "N/A"}
                          </p>
                        </div>
                        <div className={styles.productcard_productcard_col}>
                          <div className={styles.rate}>
                            {Array(5)
                              .fill("_")
                              .map((_, idx) => (
                                <GrStar
                                  size={20}
                                  key={idx + _}
                                  color={
                                    data.average_rating > idx
                                      ? "#04D505"
                                      : "rgba(0,0,0,0.5)"
                                  }
                                />
                              ))}
                          </div>

                          <p
                            className={styles.productcard_productcard_duration}
                          >
                            {data.meal_cook_time ? data.meal_cook_time : 0} min
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className={styles.productcard_row}>
            <div className={styles.productcard_col_1}>
              <h3>Products</h3>
            </div>
            <div className={styles.productcard_col_2}>
              <div className={styles.productcard_productcards}>
                {filteredProducts()
                  .slice(0, 6)
                  .map((data, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.productcard_productcard}
                      >
                        <div
                          className={
                            styles.productcard_productcard_img_container
                          }
                        >
                          <img
                            priority
                            src={data.itemImage0}
                            alt="Store"
                            className={styles.productcard_productcard_img}
                          />
                        </div>
                        <div className={styles.productcard_productcard_col}>
                          <h6 className={styles.productcard_productcard_name}>
                            {data.item_name}
                          </h6>
                        </div>
                        <div className={styles.productcard_productcard_col}>
                          <div className={styles.store_review_rating_icons}>
                            <div className={styles.rate}>
                              {Array(5)
                                .fill("_")
                                .map((_, idx) => (
                                  <GrStar
                                    size={20}
                                    key={idx + _}
                                    color={
                                      data.average_rating > idx
                                        ? "#04D505"
                                        : "rgba(0,0,0,0.5)"
                                    }
                                  />
                                ))}
                            </div>
                          </div>
                          <p className={styles.productcard_productcard_price}>
                            {data.item_price ? data.item_price : "N/A"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.store_section_8}>
          <h3>Add Review</h3>
          <Reviews />
        </div>
      </div>
    </>
  );
}

export default Store;
