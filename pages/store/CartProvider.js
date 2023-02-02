import { useReducer, useEffect } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    //localStorage.setItem("updateItems", updatedItems);
    //localStorage.setItem("updateAmount", updatedTotalAmount);
    //const localItems = JSON.parse(localStorage.getItem("updateItems"));
    //const localAmount = JSON.parse(localStorage.getItem("updateAmount"));
    //const localState = {
    //  items: localItems,
    //  totalAmount: localAmount,
    //};

    //if (localItems && localAmount) {
    //  return localState;
    //}
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    //localStorage.setItem("updateItems", updatedItems);
    //localStorage.setItem("updateAmount", updatedTotalAmount);
    //const localItems = JSON.parse(localStorage.getItem("updateItems"));
    //const localAmount = JSON.parse(localStorage.getItem("updateAmount"));
    //const localState = {
    //  items: localItems,
    //  totalAmount: localAmount,
    //};

    //if (localItems && localAmount) {
    //  return localState;
    //}

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount =
      state.totalAmount - existingItem.price * existingItem.amount;
    let updatedItems;

    updatedItems = state.items.filter((item) => item.id !== action.id);

    //localStorage.setItem("updateItems", updatedItems);
    //localStorage.setItem("updateAmount", updatedTotalAmount);
    //const localItems = JSON.parse(localStorage.getItem("updateItems"));
    //const localAmount = JSON.parse(localStorage.getItem("updateAmount"));
    //const localState = {
    //  items: localItems,
    //  totalAmount: localAmount,
    //};

    //if (localItems && localAmount) {
    //  return localState;
    //}

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR_CART") {
    //localStorage.removeItem("updateItems");
    //localStorage.removeItem("updateAmount");
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  //const reloadValue = window.performance;

  //useEffect(() => {
  //  if (cartState !== defaultCartState) {
  //    localStorage.removeItem("cart");
  //    localStorage.setItem("cart", cartState);
  //  }
  //}, [cartState, defaultCartState]);

  //useEffect(() => {
  //  if (reloadValue.type == 1) {
  //    const localState = JSON.parse(localStorage.getItem("cart"));
  //    dispatchCartAction(localState);
  //  }
  //}, [reloadValue]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "CLEAR_ITEM", id: id });
  };

  const clearCartCartHandler = (item) => {
    dispatchCartAction({ type: "CLEAR_CART", item: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItem: clearItemFromCartHandler,
    clearCart: clearCartCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
