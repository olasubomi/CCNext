import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Header, { Header2 } from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import indexStyles from "./index.module.css";
import GlobalSearchBar from "../../src/components/GlobalComponents/GlobalSearchBar";
import MainGroceryList from "../../src/components/GroceryPage/GroceryList/MainGroceryList/Index";
import SuggestedMeals from "../../src/components/GroceryPage/GroceryList/SuggestedMeals/Index";
import Cart from "../../src/components/Cart/Index";
import CartProvider from "../store/CartProvider";

const index = () => {
  const [showCart, setShowCart] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userErrData, setUserErrData] = useState({});
  const [user, setUser] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCart]);

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

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

  return (
    <CartProvider>
      {showCart ? (
        <Cart closeCart={closeCart} />
      ) : (
        <div className={indexStyles.allBody}>
          <Header route="groceryList" openCart={openCart} />
          <Header2 />
          <div className={indexStyles.groceryBody}>
            <div className={indexStyles.groceryMainBody}>
              <div className={indexStyles.arrowBack}>
                <div className={indexStyles.mainArrowRow}>
                  <Link href="/">
                    <img
                      id="backArr"
                      src="/assets/grocery_list/backArr.svg"
                      alt="arrowDown"
                    />
                  </Link>
                  <Link href="/">
                    <label>Back</label>
                  </Link>
                </div>
                <h1>Your Grocery List</h1>
              </div>
              <h2>Add new item from Store</h2>
              <div className={indexStyles.searchBody}>
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
              <div className={indexStyles.itemsHeader}>
                <label>Items</label>
                <div className={indexStyles.addDeleteText}>
                  <label>Add selection(s) to Cart</label>
                  <p>Remove selection(s)</p>
                </div>
              </div>
              <div className={indexStyles.groceryListCard}>
                {grocery?.map((list) => (
                  <MainGroceryList
                    id={list._id}
                    listName={list.listName}
                    groceryItems={list.groceryItems}
                  />
                ))}
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

export default index;
