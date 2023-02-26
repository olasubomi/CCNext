import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header, { Header2 } from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import itemsStyles from "./index.module.css";
import ListItem from "../../src/components/GroceryPage/GroceryList/ItemsBody/ListItem";
import GlobalSearchBar from "../../src/components/GlobalComponents/GlobalSearchBar";
import SuggestedMeals from "../../src/components/GroceryPage/GroceryList/SuggestedMeals/Index";
import Cart from "../../src/components/Cart/Index";
import CartProvider from "../store/CartProvider";

const GroceryPage = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userErrData, setUserErrData] = useState({});
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCart]);

  useEffect(() => {
    async function fetchUserGrocery() {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("x-auth-token");
      if (userDetails) {
        setUser(userDetails._id);
        localStorage.setItem("user_id", JSON.stringify(user));
        setUserToken(token);

        const response = await fetch(
          `http://localhost:5000/api/groceries/${user}`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: userToken,
            },
          }
        );

        const data = await response.json();

        if (data.data === undefined) {
          setUserErrData(data);
        } else {
          setUserData(data.data[0]);
        }
      }
    }

    fetchUserGrocery();
  }, [user]);

  const grocery = userData.groceryList;

  const router = useRouter();
  const listId = router.query.groceryListId;

  const groceryObj = grocery?.find((obj) => {
    return obj._id === listId;
  });

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart ? (
        <Cart closeCart={closeCart} />
      ) : (
        <div>
          <Head>
            <title>Chop Chow Grocery List</title>
            <meta
              key="title"
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Header route="groceryList" openCart={openCart} />
          <Header2 />
          <div className={itemsStyles.groceryBody}>
            <div className={itemsStyles.groceryMainBody}>
              <div className={itemsStyles.arrowBack}>
                <div className={itemsStyles.mainArrowRow}>
                  <Link href="/grocerylist">
                    <img
                      id="backArr"
                      src="/assets/grocery_list/backArr.svg"
                      alt="arrowDown"
                    />
                  </Link>
                  <Link href="/grocerylist">
                    <label>Back</label>
                  </Link>
                </div>
                <h1>Your Grocery List</h1>
              </div>
              <h2>Add new item from Store</h2>
              <div className={itemsStyles.searchBody}>
                <GlobalSearchBar
                  height="39px"
                  borderBottom="1px solid #05e105"
                  borderTop="1px solid #05e105"
                  borderLeft="1px solid #05e105"
                  borderRight="1px solid #05e105"
                  iconMl="30px"
                  inputPlaceholder="Search Meals, Ingredient and Products"
                  inputPadding="60px"
                />
              </div>
              <div className={itemsStyles.itemsHeader}>
                <label>Items</label>
                <div className={itemsStyles.addDeleteText}>
                  <label>Add selection(s) to Cart</label>
                  <p>Remove selection(s)</p>
                </div>
              </div>
              <div className={itemsStyles.allBody}>
                <div className={itemsStyles.header}>
                  <div className={itemsStyles.selectAll}>
                    <input type="checkBox" />
                    <label>Select All</label>
                  </div>
                  <div className={itemsStyles.headerItems}>
                    <p>Name</p>
                    <p>Quantity</p>
                    <p>Price</p>
                    <p>Store</p>
                    <p>Est. Pickup Time</p>
                  </div>
                  <div className={itemsStyles.divSpan}>
                    <span>Action</span>
                  </div>
                </div>

                {groceryObj?.groceryItems?.map((item) => (
                  <ListItem
                    key={item.item_id}
                    id={item.item_id}
                    picture={item.item.image}
                    name={item.item.name}
                    quantity={item.quantity}
                    price={item.item.price}
                    store={item.item.store}
                    pickUpTime={item.pickUpTime}
                  />
                ))}

                <div className={itemsStyles.goToCart} onClick={openCart}>
                  <label>Go To Cart</label>
                  <img
                    src="/assets/grocery_list/whiteCartArrow.svg"
                    alt="cart arrow"
                  />
                </div>
              </div>
              <SuggestedMeals />
            </div>
            <Footer />
          </div>
        </div>
      )}
    </CartProvider>
  );
};

export default GroceryPage;
