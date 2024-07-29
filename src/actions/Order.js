import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_EMPTY, CART_HAS_ITEM, CART_REMOVE_ITEM } from "../constants/ActionTypes";

export const addToOrderList = (product) => async (dispatch, getState) => {
    
    dispatch({
      type: ORDER_ADD_ITEM,
      payload: {
        name: product.itemName,
        image: product.item_image,
        price: product.item_price,
        itemId: product.itemId,
        userId: product.userId,
        storeName: product.store_name,
        currency: product.currency,
        amount: product.quantity,
        storeId: product.storeId
      },
    });
    if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems));
    }
  };

  export const removeFromCart = (productId) => async (dispatch, getState) => {
    
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        itemId: productId,
        
      },
    });
    if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems));
    }
  };

  export const deleteFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_DELETE_ITEM, payload: { itemId:productId} });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems));
      }
  };

  export const IsItemPresent = () => (dispatch) => {
    dispatch({ type: CART_HAS_ITEM});
  };

  export const EmptyCart = () => (dispatch, getState) => {
    dispatch({ type: CART_EMPTY});
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(getState().Cart.cartItems));
    }
  };

  

  