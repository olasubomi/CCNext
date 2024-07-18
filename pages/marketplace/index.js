import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Header, { Header2, Header3 } from "../../src/components/Header/Header";
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
import * as BaseAxios from "axios";
import { AllStores } from "../../src/components/public-market/all-stores";
import { AllPopularMeals } from "../../src/components/public-market/all-popular-meals";
import { AllProducts } from "../../src/components/public-market/all-products";
import { AllUtensils } from "../../src/components/public-market/all-utensils";

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
  });
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

  const onSuccess = useCallback(async (location) => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      console.log("Longitude:", location.coords.longitude);
      console.log("Latitude:", location.coords.latitude);
      setIsLoading(true);

      try {
        setLongLat({
          longitude: location?.coords?.longitude,
          latitude: location?.coords?.latitude,
        });
        // Log longitude and latitude
        console.log(location.coords, "long");

        const res = await BaseAxios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.coords?.latitude},${location?.coords?.longitude}&key=AIzaSyDJ2OXLQoX_83t-DYmg-zIs3keZmNAZHzk`
        );
        const data = res.data;
        console.log(res, "respo");
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
  const [activeSubLink, setActiveSubLink] = useState(0);

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
      <Header2
        pathname={router.pathname}
        activeSubLink={activeSubLink}
        setActiveSubLink={setActiveSubLink}
      />
      <Sidenav />

      {/* <div className={styles.header}>
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
      </div> */}

      {activeSubLink === 0 && (
        <>
          <div className={styles.marketplace}>
            <h1>Marketplace</h1>
            <p>
              Put your meals and product on Chop Chow to show off what you’ve
              cooked with family and friends
            </p>
          </div>
          <div className={styles.storeContainer}>
            {categories.find((ele) => ele.label === "Stores")?.value && (
              <Stores />
            )}
          </div>
          <>
            {categories.find((ele) => ele.label === "Meals")?.value && (
              <div>
                <PopularMeals />
              </div>
            )}
          </>
          <>
            {categories.find((ele) => ele.label === "Products")?.value && (
              <div>
                <TopSellingProducts />
              </div>
            )}
          </>
          <>
            {categories.find((ele) => ele.label === "Kitchen Utensils")
              ?.value && (
              <div>
                <SuggestedUtensils />
              </div>
            )}
          </>
        </>
      )}
      {activeSubLink === 1 && (
        <div className={styles.storeContainer}>
          {categories.find((ele) => ele.label === "Stores")?.value && (
            <AllStores />
          )}
        </div>
      )}
      <div>
        {activeSubLink === 2 && (
          <>
            {categories.find((ele) => ele.label === "Meals")?.value && (
              <div>
                <AllPopularMeals />
              </div>
            )}
          </>
        )}
      </div>
      {activeSubLink === 3 && (
        <>
          {categories.find((ele) => ele.label === "Products")?.value && (
            <div>
              <AllProducts />
            </div>
          )}
        </>
      )}
      {activeSubLink === 4 && (
        <>
          {categories.find((ele) => ele.label === "Kitchen Utensils")
            ?.value && (
            <div>
              <AllUtensils />
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};
export default PublicMarket;
