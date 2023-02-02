import React, { useContext } from "react";
import itemStyle from "./Index.module.css";
import CartContext from "../../../../../pages/store/cart-context";

function ListItem(props) {
  const cartCtx = useContext(CartContext);

  //const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: props.quantity,
      picture: props.picture,
      price: props.price,
      store: props.store,
      pickUpTime: props.pickUpTime,
    });
  };

  return (
    <div className={itemStyle.listItemBody}>
      <div className={itemStyle.checkB}>
        <input type="checkbox" />
        <img src={props.picture} />
      </div>
      <div className={itemStyle.listItems}>
        <label>{props.name}</label>
        <label>x{props.quantity}</label>
        <label>${props.price}</label>
        <label>{props.store}</label>
        <label>{props.pickUpTime}</label>
      </div>
      <div className={itemStyle.listItemAction}>
        <div className={itemStyle.addToCart}>
          <label onClick={addToCartHandler}>Add Product to Cart</label>
        </div>
        <img src="/assets/grocery_list/closeIcon.svg" />
      </div>
    </div>
  );
}

export default ListItem;
