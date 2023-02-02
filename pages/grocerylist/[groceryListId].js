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

const dummyGrocerylist = [
  {
    id: "List1",
    listName: "Veggie List",
    dummyItems: [
      {
        id: "List11",
        name: "Banana Hanger",
        img: "/assets/grocery_list/bananaImg.svg",
        quantity: 1,
        price: "40.00",
        store: "Oriental Store",
        pickUpTime: "30 minutes",
      },
      {
        id: "List12",
        name: "Spinach",
        img: "/assets/grocery_list/spinachImg.svg",
        quantity: 3,
        price: "5.43",
        store: "Lizy Gidy",
        pickUpTime: "34 minutes",
      },
      {
        id: "List13",
        name: "Australian RIce",
        img: "/assets/grocery_list/austRiceImg.svg",
        quantity: 1,
        price: "43.34",
        store: "Metron",
        pickUpTime: "22 minutes",
      },
      {
        id: "List14",
        name: "PP Beans",
        img: "/assets/grocery_list/ppBeansImg.svg",
        quantity: 2,
        price: "8.45",
        store: "Cold Stone",
        pickUpTime: "11 minutes",
      },
    ],
  },
  {
    id: "List2",
    listName: "Utensils List",
    dummyItems: [
      {
        id: "List21",
        name: "Spoon",
        img: "/assets/grocery_list/bananaImg.svg",
        quantity: 1,
        price: "1.00",
        store: "Oriental Store",
        pickUpTime: "30 minutes",
      },
      {
        id: "List22",
        name: "Sieve",
        img: "/assets/grocery_list/spinachImg.svg",
        quantity: 3,
        price: "5.43",
        store: "Lizy Gidy",
        pickUpTime: "34 minutes",
      },
      {
        id: "List23",
        name: "Kettle",
        img: "/assets/grocery_list/austRiceImg.svg",
        quantity: 1,
        price: "43.34",
        store: "Metron",
        pickUpTime: "22 minutes",
      },
      {
        id: "List24",
        name: "Plates",
        img: "/assets/grocery_list/ppBeansImg.svg",
        quantity: 2,
        price: "8.45",
        store: "Cold Stone",
        pickUpTime: "11 minutes",
      },
    ],
  },
  {
    id: "List3",
    listName: "ingredients List",
    dummyItems: [
      {
        id: "List31",
        name: "Curry Powder",
        img: "/assets/grocery_list/bananaImg.svg",
        quantity: 1,
        price: "40.00",
        store: "Oriental Store",
        pickUpTime: "30 minutes",
      },
      {
        id: "List32",
        name: "Maggi cubes",
        img: "/assets/grocery_list/spinachImg.svg",
        quantity: 3,
        price: "5.43",
        store: "Lizy Gidy",
        pickUpTime: "34 minutes",
      },
      {
        id: "List33",
        name: "Pepper sauce",
        img: "/assets/grocery_list/austRiceImg.svg",
        quantity: 1,
        price: "43.34",
        store: "Metron",
        pickUpTime: "22 minutes",
      },
      {
        id: "List34",
        name: "Coconut Flavor",
        img: "/assets/grocery_list/ppBeansImg.svg",
        quantity: 2,
        price: "8.45",
        store: "Cold Stone",
        pickUpTime: "11 minutes",
      },
    ],
  },
];

const GroceryPage = (props) => {
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCart]);

  const router = useRouter();
  const listId = router.query.groceryListId;

  const groceryObj = dummyGrocerylist.find((obj) => {
    return obj.id === listId;
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

                {groceryObj.dummyItems.map((item) => (
                  <ListItem
                    key={item.id}
                    id={item.id}
                    picture={item.img}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    store={item.store}
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
