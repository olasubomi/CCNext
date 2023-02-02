import React from "react";
import cartStyles from "./Index.module.css";

function CartItem(props) {
  const itemTotal = (props.amount * props.price).toFixed(2);

  return (
    <div className={cartStyles.cartCard}>
      <div className={cartStyles.cartProduct}>
        <img src={props.picture} alt="rice" />
        <label>{props.name}</label>
      </div>
      <div className={cartStyles.cartQuantity}>
        <div className={cartStyles.qty}>
          <label onClick={props.onRemove}>-</label>
        </div>
        <label>{props.amount}</label>
        <div className={cartStyles.qty}>
          <label onClick={props.onAdd}>+</label>
        </div>
      </div>
      <div className={cartStyles.cartValues}>
        <label>{props.store}</label>
        <label>${props.price}</label>
        <label>${itemTotal}</label>
        <img
          src="/assets/grocery_list/closeIcon.svg"
          onClick={props.onClearItem}
        />
      </div>
    </div>
  );
}

export default CartItem;
