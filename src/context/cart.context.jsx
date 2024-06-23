import { createContext, useState, useContext, useMemo } from "react";


export const CartContext = createContext({
    cartItems: [],
    addItemsToCart: () => { },
    clearCartItem: () => { },
    removeCartItem: () => { },
    setCartItems: () => { },
    cartHasItem: () => { }
})


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addItemsToCart = (item, toggle) => {
        if (toggle) {
            const itemIndex = cartItems.findIndex(ele => ele?.item_name === item.item_name)
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1)
                setCartItems([...cartItems])
            } else {
                setCartItems([...cartItems, { ...item, qty: 1 }])
            }
        } else {
            const data = cartItems.map(element => {
                if (element.item_name === item.item_name) {
                    return {
                        ...element,
                        qty: element.qty + 1
                    }
                } else {
                    return element
                }
            })
            setCartItems(data)
        }
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

    const value = { addItemsToCart, cartItems, removeCartItem, clearCartItem, cartHasItem }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)