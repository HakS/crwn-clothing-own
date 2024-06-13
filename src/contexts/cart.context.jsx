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
const decreaseItemQty = (cartItems, productToDecrease) => {
  return cartItems.map(cartItem =>
    cartItem.id === productToDecrease.id
      ? { ...cartItem, quantity: (cartItem.quantity > 1 ? cartItem.quantity - 1 : cartItem.quantity) }
      : cartItem
  )

}
const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
  expanded: false,
  setExpanded: () => false,
  cartItems: [],
  cartCount: 0,
  totalCount: 0,
  addItemToCart: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  removeItemFromCart: () => {},
})

export const CartProvider = ({children}) => {
  const [expanded, setExpanded] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const decreaseItemQuantity = (productToDecrease) => {
    setCartItems(decreaseItemQty(cartItems, productToDecrease))
  }
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  const value = {
    expanded, setExpanded, cartItems, addItemToCart, decreaseItemQuantity, removeItemFromCart,
    cartCount: cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    ),
    totalCount: cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    )
  }

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}
