import { createContext, useState, useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions";


export const CartContext = createContext({
    cartItems: [],
    addItemsToCart: () => { },
    clearCartItem: () => { },
    removeCartItem: () => { },
    setCartItems: () => { },
    cartHasItem: () => { },
    AddSelectionToCart: () => {}
})


export const CartProvider = ({ children }) => {
 
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();
    console.log("context", cartItems)
    const addItemsToCart = (item, toggle) => {
        console.log("context", { item1: item, toggle1: toggle });
    
        if (toggle) {
          // Check if the item already exists in the cart
          const itemExists = cartItems.some(ele => ele?.item_name === item.item_name);
    
          if (itemExists) {
            // Remove the item if it exists and toggle is true
            const updatedCartItems = cartItems.filter(ele => ele?.item_name !== item.item_name);
            setCartItems(updatedCartItems);
          } else {
            // Add the item if it doesn't exist and toggle is true
            setCartItems(prevItems => [
              ...prevItems,
              { ...item, qty: item.qty !== undefined ? Number(item.qty) : 1 }
            ]);
          }
        }
    }

   const AddSelectionToCart = () => {
        if(cartItems.length > 0) {
          
            const user = JSON.parse(localStorage.getItem("user"));
            cartItems.forEach(item => {
                if(item.qty == 0 ){
                    toast.error("Pls add a quantity");
                }else{
                    const payload = {
                    userId: (user && user._id) ? user._id : "{}",
                    storeId : "",
                    store_name: "",
                    itemId : item._id,
                    quantity: item.qty,
                    item_price: item.item_price,
                    currency: "$",
                    item_image: item.itemImage0,
                    itemName: item.item_name,
                    item_type:  item.item_type? item.item_type : "Meal",
                } 
                console.log(payload, "Cart payload line 76 top-selling-product");
                try {
                    dispatch(addToCart(payload))
                  
                } catch (error) {
                    console.log(error);
                }
                };

                
            })
            setCartItems([])
            
            };
   
    }

    const removeCartItem = (item) => {
        if (item.qty === 1) {
            const itemIndex = cartItems.findIndex(element => element.item_name === item.item_name)
            cartItems.splice(itemIndex, 1)
            setCartItems([...cartItems])
        } else {
            const data = cartItems.map(element => {
                if (element.item_name === item.item_name) {
                    return {
                        ...element,
                        qty: element.qty - 1
                    }
                } else {
                    return element
                }
            })
            setCartItems(data)
        }
    }

    const clearCartItem = (item) => {
        const itemIndex = cartItems.findIndex(element => element.item_name === item.item_name)
        cartItems.splice(itemIndex, 1)
        setCartItems([...cartItems])
    }

    const cartHasItem = (item) => {
        return cartItems.some(element => element.item_name === item.item_name)
    }


    const value = { addItemsToCart, cartItems, removeCartItem, clearCartItem, cartHasItem, AddSelectionToCart }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)





