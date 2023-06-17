import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header, { Header2 } from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import itemsStyles from "./index.module.css";
import SideNav from "../../src/components/Header/sidenav";
import ListItem from "../../src/components/GroceryPage/GroceryList/ItemsBody/ListItem";
import GlobalSearchBar from "../../src/components/GlobalComponents/GlobalSearchBar";
import SuggestedMeals from "../../src/components/GroceryPage/GroceryList/SuggestedMeals/Index";
import Cart from "../../src/components/Cart/Index";
import CartProvider from "../store/CartProvider";
import { useMobileMedia } from "../../src/customhooks/useResponsive";
import Items from "../../src/components/items/Items";

const productGrocery = [
  {
    _id: "642f7fd172d63112db71e8fe",
    userId: "642f7625c49c7410bbae2751",
    groceryList: [
      { 
          _id: "soupId",
          listName: "Soup List",
          groceryItems: [
            {
            _id: "spinach",
            product_id: "spinachId",
            product: {
            name: "Spinach",
            store: "Oriental Store",
            price: "2.05",
            quantity: 8,
            pickUpTime: "45 mins",
            image: "/assets/grocery_list/spinachImg.svg"
            }
          },
          {
            _id: "austRice",
            product_id: "austRiceId",
            product: {
              name: "Australia rice",
              store: "Gidy Lizy",
              price: "8.30",
              quantity: 4,
              pickUpTime: "26 mins",
              image: "/assets/grocery_list/austRiceImg.svg"
            }
            
          },
          {
            _id: "ppBeans",
            product_id: "ppBeansId",
            product: {
            name: "PP Beans",
            store: "Flava mall",
            price: "25.34",
            quantity: 12,
            pickUpTime: "34 mins",
            image: "/assets/grocery_list/ppBeansImg.svg"
            }
          },
          {
            _id: "banana",
            product_id: "bananaId",
            product: {
            name: "Banana Hanger",
            store: "Oriental Store",
            price: "12.00",
            quantity: 6,
            pickUpTime: "50 mins",
            image: "/assets/grocery_list/bananaImg.svg"
            }
          },
          {
            _id: "gbegiri",
            product_id: "gbegiriId",
            product: {
            name: "Gbegiri",
            store: "Panshak",
            price: "7.15",
            quantity: 1,
            pickUpTime: "39 mins",
            image: "/assets/grocery_list/suggestedmeals/gbegiriImg.svg"
            }
          },
          {
            _id: "ijebuRice",
            product_id: "ijebuRiceId",
            product: {
            name: "Ijebu Rice",
            store: "Market square",
            price: "11.25",
            quantity: 5,
            pickUpTime: "20 mins",
            image: "/assets/grocery_list/suggestedmeals/ijebuRiceImg.svg"
            }
          },
          {
            _id: "guguru",
            product_id: "guguruId",
            product: {
            name: "Guguru",
            store: "Ebeano supermarket",
            price: "24.02",
            quantity: 9,
            pickUpTime: "47 mins",
            image: "/assets/grocery_list/suggestedmeals/guguruImg.svg"
            }
          },
          {
            _id: "goatMeat",
            product_id: "goatMeatId",
            product: {
            name: "Asun",
            store: "Tunishi square",
            price: "32.20",
            quantity: 3,
            pickUpTime: "44 mins",
            image: "/assets/grocery_list/suggestedmeals/goatMeatImg.svg"
            }
          },
          {
            _id: "ewa",
            product_id: "ewaId",
            product: {
            name: "Ewa Iganyi",
            store: "Ebbos shop",
            price: "17.55",
            quantity: 2,
            pickUpTime: "54 mins",
            image: "/assets/grocery_list/suggestedmeals/ewaIganyiImg.svg"
            }
          },
         
        ]
      }
      ],
  }
];


const GroceryPage = (props) => {
  const [showCart, setShowCart] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userErrData, setUserErrData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCard, setActiveCard] = useState("");
  const [productData, setProductData] = useState([]);
  const [productErrData, setProductErrData] = useState({});
  const [itemsData, setItemsData] = useState([]);


  const mobileScreen = useMobileMedia();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCart]);

  async function fetchItems() {
    const response = await fetch(`http://localhost:5000/api/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.data === undefined) {
      setProductErrData(data);
    } else {
      setItemsData(data.data);
    }
  }

  async function fetchUserGrocery() {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("x-auth-token");
    const user_id = userDetails._id;

    if (userDetails) {
      localStorage.setItem("user_id", JSON.stringify(user_id));

      const response = await fetch(
        `http://localhost:5000/api/groceries/${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      
      if (data.data === undefined) {
        setUserErrData(data);
      } else {
        setUserData(data.data[0]);
      }
    } else {
      setUserData([]);
    }
  }


  useEffect(() => {
    fetchItems();
    fetchUserGrocery();
  }, []);

  const grocery = userData.groceryList;

  const router = useRouter();
 
  const listId = router.query.groceryListId;

  const groceryObj = grocery?.find((obj) => {
    return obj._id === listId;
  });

  const items = itemsData;

// const groceryObj = productGrocery[0].groceryList?.find((obj) => {
//    return obj._id === listId;
//  });
  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  //const products = productData;

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
          <SideNav/>
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
              <div className={itemsStyles.searchInput}>
              <img
                    src="/assets/grocery_list/Search.svg"
                    alt="search icon"
                  />
                  <input
                    placeholder="Search Meals, Ingredient and Products"
                    value={searchTerm}
                    onChange={(event) => {
                      if (event.target.value === "") {
                        setSearchTerm("");
                        setActiveCard("");
                      } else {
                        setSearchTerm(event.target.value);
                        setActiveCard(event.target.value);
                      }
                    }}
                  />
              </div>
              {items
                  .filter((item) => {
                    if (searchTerm == "") {
                      return null;
                    } else if (
                      item.item_name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) && item.item_status[0]?.status === "Draft"
                    ) {
                      return item;
                    }
                  })
                  .map((item) => (
                    <Items
                    itemName={item.item_name}
                    itemPrice={item.item_price}
                    itemStore={item.store_name}
                  />
                  ))}
              </div>
              <div className={itemsStyles.itemsHeader}>
                <label>Items</label>
                <div className={itemsStyles.addDeleteText}>
                  <label>Add selection(s) to Cart</label>
                  <p>Remove selection(s)</p>
                </div>
              </div>
              <div className={itemsStyles.allBody}>
                {!mobileScreen && (<div className={itemsStyles.header}>
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
                </div>)}

                {groceryObj?.groceryItems?.map((item) => (
                  <ListItem
                    key={item.item_id}
                    id={item.item_id}
                    picture={item.item.item_images[0]}
                    name={item.item.item_name}
                    quantity={item.quantity}
                    price={item.item.item_price}
                    store={item.item.store_name}
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
