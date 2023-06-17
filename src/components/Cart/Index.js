import React, { useContext } from "react";
import Head from "next/head";
import Header, { Header2 } from "../Header/Header";
import TimeBar from "../GroceryPage/CartPage/Cart/TimeBar";
import indexStyles from "./Index.module.css";
import CartItem from "../GroceryPage/CartPage/CartItem/Index";
import Footer from "../Footer/Footer";
import CartContext from "../../../pages/store/cart-context";
import SideNav from "../Header/sidenav";
import { useMobileMedia } from '../../customhooks/useResponsive';

function Index(props) {

  const mobileScreen = useMobileMedia();

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemClearHandler = (id) => {
    cartCtx.clearItem(id);
  };

  const cartCartClearHandler = (id) => {
    cartCtx.clearCart(id);
  };

  return (
    <div className={indexStyles.cartBackground}>
      <Head>
        <title>Chop Chow Cart</title>
        <meta
          key="title"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Header route="groceryList" />
      <Header2 />
      <SideNav/> 
      <TimeBar />
      <div className={indexStyles.cartBody}>
        <div className={indexStyles.cartMainBody}>
          <div className={indexStyles.arrowBack}>
            <div className={indexStyles.mainArrowRow}>
              <img
                id="backArr"
                src="/assets/grocery_list/backArr.svg"
                alt="arrowDown"
                onClick={props.closeCart}
              />
              <label onClick={props.closeCart}>Back</label>
            </div>
            <h1>CART</h1>
          </div>
          {!mobileScreen ? <div className={indexStyles.cartHeader}>
            <div className={indexStyles.cartHeaderRow1}>
              <label>Product</label>
            </div>
            <div className={indexStyles.cartHeaderRow2}>
              <label>Quantity</label>
            </div>
            <div className={indexStyles.cartHeaderRow3}>
              <label>Store</label>
              <label>Price</label>
              <label>Subtotal</label>
              <label>Action</label>
            </div>
          </div> : "Items"}
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              amount={item.amount}
              picture={item.picture}
              price={item.price}
              store={item.store}
              totalAmount={totalAmount}
              pickUpTime={item.pickUpTime}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
              onClearItem={cartItemClearHandler.bind(null, item.id)}
            />
          ))}
          <div className={indexStyles.couponPrice}>
            <div className={indexStyles.coupon}>
              <div className={indexStyles.couponBlack}>
                <img src="/assets/grocery_list/couponImg.svg" alt="coupon" />
                <p>Apply Coupon</p>
              </div>
              <div className={indexStyles.couponWhite}>
                <p>5% on first buy</p>
              </div>
            </div>
            <div className={indexStyles.priceRow}>
              <div className={indexStyles.mainPrice}>
                <label>Total Price</label>
                <label>{totalAmount}</label>
              </div>
              <div className={indexStyles.checkoutButton}>
                <div className={indexStyles.whiteButton}>
                  {hasItems ? (
                    <label onClick={cartCartClearHandler}>Clear Cart</label>
                  ) : (
                    <label onClick={props.closeCart}>Add Items</label>
                  )}
                </div>
                {hasItems && (
                  <div className={indexStyles.greenButton}>
                    <label>Check Out</label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
