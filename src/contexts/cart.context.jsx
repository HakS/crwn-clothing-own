import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(ci => productToAdd.id === ci.id)
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    )
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }]
  }
}

export const CartContext = createContext({
  expanded: false,
  setExpanded: () => false,
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

export const CartProvider = ({children}) => {
  const [expanded, setExpanded] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const value = {
    expanded, setExpanded, cartItems, addItemToCart,
    cartCount: cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    )
  }

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}
