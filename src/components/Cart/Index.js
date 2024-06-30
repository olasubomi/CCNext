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
import { connect, useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart, EmptyCart, removeFromCart } from "../../actions/Cart";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';


function Cart(props) {

  const mobileScreen = useMobileMedia();
  const {cartItems: items} = useSelector((state) => { console.log("line 21 Cart Page", state)
  return state.Cart});
  const dispatch = useDispatch();
  const router = useRouter();
  //const cartCtx = useContext(CartContext);
  console.log("line 22 Cart Page", props)
  console.log("line 23 Cart Page", items)
  //const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = items.length > 0 ;
  

const totalQuantity = `${items.reduce((a, c) => a + c.amount, 0)} items`
const totalPrice = items.reduce((a, c) => a + (c.price * c.amount), 0).toFixed(2)

  // const cartItemRemoveHandler = (id) => {
  //   cartCtx.removeItem(id);
  // };

  // const cartItemAddHandler = (item) => {
  //   cartCtx.addItem({ ...item, amount: 1 });
  // };

  // const cartItemClearHandler = (id) => {
  //   cartCtx.clearItem(id);
  // };

  // const cartCartClearHandler = (id) => {
  //   cartCtx.clearCart(id);
  // };

const generateOrderId = () => {
  return uuidv4()
}

const Checkout = () => {
  const id = generateOrderId();
  router.push(`/checkout/${id}`)
}

const AddToCart = (item) => {
  const payload = {
    itemName: item.name,
    item_image: item.picture,
    item_price: item.price,
    itemId : item.id,
    userId: item.userId || "",
    storeName: item.store,
    currency: item.currency,
    quantity: item.amount,
    storeId : item.storeId,
    
} 
console.log(payload, "Cart payload 65");
try {
  dispatch(addToCart(payload))
  toast.success("Item Increased successfully");
  
} catch (error) {
  console.log(error);
}

};

const RemoveFromCart = (product) => {
  dispatch(removeFromCart(product.id));
};

const CloseCart = () => {
  router.push('/')
}

const DeleteFromCart = (product) => {
  dispatch(deleteFromCart(product.id));
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
                onClick={CloseCart}
              />
              <label onClick={props.closeCart}>Back</label>
            </div>
            <h1>{hasItems ? "CART" : "CART IS EMPTY" }</h1>
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
          {items.map((item) => (
            <CartItem
              key={item.itemId}
              id={item.itemId}
              name={item.name}
              amount={item.amount}
              picture={item.image}
              price={item.price}
              store={item.storeName}
              totalAmount={item.totalAmount}
              storeId = {item.storeId}
              userId ={item.userId}             
              onAdd= {AddToCart}
              onRemove= {RemoveFromCart}
              onDelete = {DeleteFromCart}
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
                
                <label style={{marginRight:"10rem"}}>{`${Number(totalPrice)} for ${totalQuantity}`} </label>
              </div>
              <div className={indexStyles.checkoutButton}>
                <div className={indexStyles.whiteButton}>
                  {hasItems ? (
                    <label onClick={() => dispatch(EmptyCart()) }>Clear Cart</label>
                  ) : (
                    <label onClick={CloseCart}>Add Items</label>
                  )}
                </div>
                {hasItems && (
                  <div className={indexStyles.greenButton} onClick = {() => Checkout()}>
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


export default Cart;
