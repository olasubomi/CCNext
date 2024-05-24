import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Header, { Header2 } from "../../src/components/Header/Header";
import GoBack from "../../src/components/CommonComponents/goBack";
import styles from "../../src/components/public-market/public-market.module.css";
import { HiLocationMarker } from "react-icons/hi";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import {
  PopularMeals,
  Stores,
  TopSellingProducts,
  SuggestedUtensils,
} from "../../src/components/public-market";
import Footer from "../../src/components/Footer/Footer";
import { useRouter } from "next/router";
import axios from "../../src/util/Api";
import { AddressInput } from "../../src/components/public-market/input";
import { useMediaQuery } from "../../src/hooks/usemediaquery";
import Sidenav from "../../src/components/Header/sidenav";
import * as BaseAxios from 'axios'

const PublicMarket = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [store, setStore] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [longLat, setLongLat] = useState({
    longitude: "",
    latitude: "",
  })
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const addressRef = useRef();
  const matches = useMediaQuery("(min-width: 768px)");

  const ref = useRef();
  const [oneStore, setOneStore] = useState({
    visible: false,
    id: "",
  });
  const [categories, setCategories] = useState([
    {
      label: "All categories",
      value: true,
    },
    {
      label: "Stores",
      value: true,
    },
    {
      label: "Meals",
      value: true,
    },
    {
      label: "Products",
      value: true,
    },
    {
      label: "Kitchen Utensils",
      value: true,
    },
  ]);

  const getItem = async (name) => {
    try {
      const response = await axios.get(`/items/filter/${name}`);
      const resp = response.data.data.map((element) => {
        return {
          label: element.item_name,
          value: element._id,
          image: element?.itemImage0,
          price: element?.item_price ? `$${element?.item_price}` : "No Price",
          store: element?.store_available?.store_name || "No store",
          item_type: element?.item_type,
        };
      });
      setItems(resp);
      console.log(response.data.data, "resp");
    } catch (error) {
      console.log(error);
    }
    return name;
  };
  console.log(items, "item");

  const getStore = async (name) => {
    try {
      const response = await axios.get(`/stores/store/${name}`);
      const resp = response.data.data.supplier.map((element) => {
        return {
          label: element.store_name,
          value: element._id,
        };
      });
      setStore(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredItem = () => {
    return items.filter((elem) => elem.item_type === "Meal");
  };
  const filteredProduct = () => {
    return items.filter((elem) => elem.item_type === "Product");
  };
  const filteredUtensils = () => {
    return items.filter((elem) => elem.item_type === "Utensils");
  };
  const onSuccess = useCallback(async (location) => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      console.log('Longitude:', location.coords.longitude);
      console.log('Latitude:', location.coords.latitude);
      setIsLoading(true);
      
      try {
        setLongLat({
          longitude: location?.coords?.longitude,
          latitude: location?.coords?.latitude,
        });
        // Log longitude and latitude
        console.log(location.coords, 'long')

        const res = await BaseAxios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.coords?.latitude},${location?.coords?.longitude}&key=AIzaSyDJ2OXLQoX_83t-DYmg-zIs3keZmNAZHzk`
        );
        const data = res.data;
        console.log(res, 'respo')
        const curr_location =
          data?.results?.find(
            (ele) =>
              ele?.types?.includes("street_address") ||
              ele?.types?.includes("route")
          )?.formatted_address || "";
        setCurrentAddress(curr_location);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  }, []);

  const onError = useCallback((error) => {
    console.log(error, "error");
    window.alert(error?.message || "Unable to get location");
  }, []);
  useEffect(() => {
    const path = router.asPath.split("#");
    if (Array.isArray(path) && path.length === 2) {
      const doc = document.querySelector(`#${path[1]}`);
      if (doc) {
        doc.scrollIntoView();
      }
    }
  }, []);
  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setShow(false);
        }
      },
      true
    );
  }, []);
  console.log(store, "store");
  return (
    <div className={styles.container}>
      <Head>
        <title>Chop Chow Marketplace</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <meta
          name="description"
          content="Search recipes by ingredients and 
        many more categories. Curious to know what to make with an Ingredient 
        you already have? Use Chop Chow to find new recipes and share meals 
        made from home."
        />
      </Head>
      <Header />
      <Header2 />
      <Sidenav />

      <div className={styles.header}>
        <p className={styles.title}>Access stores near you</p>
        <AddressInput
          showLocation={showLocation}
          currentAddress={currentAddress}
          isLoading={isLoading}
          setShowLocation={setShowLocation}
          showAddress={showAddress}
          ref={addressRef}
          setIsLoading={setIsLoading}
          setCurrentAddress={setCurrentAddress}
          setShowAddress={setShowAddress}
          showCurrentLocation={showCurrentLocation}
          setShowCurrentLocation={setShowCurrentLocation}
        />
        <div
          className={styles.location}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            addressRef.current?.handleGetStoreByLocation();
            setShowLocation(!showLocation);
            setShowCurrentLocation(true);
            console.log(showLocation, "showLocation");
          }}
        >
          <HiLocationMarker size={17} fill="#FFFFFF" />
          <p className={styles.title} style={{ marginLeft: ".4rem" }}>
            Use my current location
          </p>
        </div>
      </div>
      <div className={styles.header2}>
        <GoBack />
        {matches ? (
          <div className={styles.two}>
            <div>
              <div
                className={styles.searchbox}
                onClick={() => setShowCategory(!showCategory)}
              >
                {categories[0].value && categories.some((ele) => !ele.value)
                  ? "All categories"
                  : categories.find((ele) => ele.value).label}
                <GoTriangleUp
                  className={!showCategory ? styles.rotate : styles.nonrotate}
                  size={15}
                />
              </div>
              {showCategory && (
                <div className={styles.categories}>
                  {categories.map((option) => (
                    <p
                      onClick={() => {
                        let arr = [];
                        if (option.label === "All categories") {
                          arr = categories.map((ele) => {
                            return {
                              ...ele,
                              value: true,
                            };
                          });
                        } else {
                          arr = categories.map((ele) => {
                            if (ele.label === option.label) {
                              return {
                                ...ele,
                                value: true,
                              };
                            } else {
                              return {
                                ...ele,
                                value: false,
                              };
                            }
                          });
                        }

                        setCategories(arr);
                      }}
                      key={option?.label}
                    >
                      {option?.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div ref={ref} className={styles.searchflex}>
              <div className={styles.search}>
                <input
                  placeholder="Search Marketplace"
                  autoComplete="off"
                  onFocus={() => setShow(true)}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    getItem(e.target.value);
                    getStore(e.target.value);
                  }}
                  type="text"
                  name="search"
                />
                {show && (
                  <div className={styles.searchDropdown}>
                    <>
                      <>
                        {categories.find((ele) => ele.label === "Stores")
                          ?.value && (
                          <>
                            <h4 className={styles.storeTitle}>
                              Stores ({store.length})
                            </h4>
                            <div className={styles.bord} />
                            <div className={styles.list}>
                              {store.length === 0 ? (
                                Boolean(value) ? (
                                  <div className={styles.result}>
                                    <p>No Result Found</p>
                                    <button
                                      onClick={() =>
                                        router.push(`/suggest-store/${value}`)
                                      }
                                    >
                                      Suggest Store
                                    </button>
                                  </div>
                                ) : null
                              ) : (
                                store.slice(0, 4).map((stores) => (
                                  <p
                                    key={stores.value}
                                    onClick={() => {
                                      setOneStore({
                                        visible: true,
                                        id: stores.value,
                                      });
                                      setValue(stores.label);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {stores.label}
                                  </p>
                                ))
                              )}
                            </div>
                          </>
                        )}
                      </>
                    </>
                    <>
                      {categories.find((ele) => ele.label === "Meals")
                        ?.value && (
                        <>
                          <h4 className={styles.storeTitle}>
                            Meals ({filteredItem().length})
                          </h4>
                          <div className={styles.bord} />
                          <div className={styles.list}>
                            {filteredItem().length === 0 ? (
                              Boolean(value) ? (
                                <div className={styles.result}>
                                  <p>No Result Found</p>
                                  <button
                                    onClick={() => router.push("/suggestmeal")}
                                  >
                                    Suggest Meal
                                  </button>
                                </div>
                              ) : null
                            ) : (
                              filteredItem()
                                ?.slice(0, 4)
                                .map((elem) => (
                                  <p
                                    key={elem.value}
                                    onClick={() => {
                                      setOneStore({
                                        visible: false,
                                        id: "",
                                      });
                                      setValue(elem.label);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {elem.label}
                                  </p>
                                ))
                            )}
                          </div>
                        </>
                      )}
                    </>

                    <>
                      {categories.find((ele) => ele.label === "Products")
                        ?.value && (
                        <>
                          <h4 className={styles.storeTitle}>
                            Products ({filteredProduct().length})
                          </h4>
                          <div className={styles.bord} />
                          <div className={styles.list}>
                            {filteredProduct().length === 0 ? (
                              Boolean(value) ? (
                                <div className={styles.result}>
                                  <p>No Result Found</p>
                                  <button
                                    onClick={() => router.push("/suggestmeal")}
                                  >
                                    Suggest Product
                                  </button>
                                </div>
                              ) : null
                            ) : (
                              filteredProduct()
                                ?.slice(0, 4)
                                .map((elem) => (
                                  <p
                                    key={elem.value}
                                    onClick={() => {
                                      setOneStore({
                                        visible: false,
                                        id: "",
                                      });
                                      setValue(elem.label);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {elem.label}
                                  </p>
                                ))
                            )}
                          </div>
                        </>
                      )}
                    </>

                    <>
                      {categories.find(
                        (ele) => ele.label === "Kitchen Utensils"
                      )?.value && (
                        <>
                          <h4 className={styles.storeTitle}>
                            Kitchen Utensils ({filteredUtensils().length})
                          </h4>
                          <div className={styles.bord} />
                          <div className={styles.list}>
                            {filteredUtensils().length === 0 ? (
                              Boolean(value) ? (
                                <div className={styles.result}>
                                  <p>No Result Found</p>
                                  <button
                                    onClick={() => router.push("/suggestmeal")}
                                  >
                                    Suggest Utensil
                                  </button>
                                </div>
                              ) : null
                            ) : (
                              filteredUtensils()
                                ?.slice(0, 4)
                                .map((elem) => (
                                  <p
                                    key={elem.value}
                                    onClick={() => {
                                      setOneStore({
                                        visible: false,
                                        id: "",
                                      });
                                      setValue(elem.label);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {elem.label}
                                  </p>
                                ))
                            )}
                          </div>
                        </>
                      )}
                    </>
                  </div>
                )}
              </div>
              <button
                className={styles.searchbtn}
                onClick={() => {
                  if (oneStore.visible) {
                    router.push(`/store/${oneStore.id}`);
                  } else {
                    items.item_type === "Meal"
                      ? router.push(`/meal/${value}`)
                      : items.item_type === "Product"
                      ? router.push(`/product/${value}`)
                      : router.push(`/product/${value}`);
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.storeContainer}>
        {categories.find((ele) => ele.label === "Stores")?.value && <Stores />}
      </div>
      {categories.find((ele) => ele.label === "Meals")?.value && (
        <div>
          <PopularMeals />
        </div>
      )}
      {categories.find((ele) => ele.label === "Products")?.value && (
        <div>
          <TopSellingProducts />
        </div>
      )}
      {categories.find((ele) => ele.label === "Kitchen Utensils")?.value && (
        <div>
          <SuggestedUtensils />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default PublicMarket;
