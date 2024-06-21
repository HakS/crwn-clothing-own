import { createContext, useReducer } from "react";
import { createAction } from '../utils/firebase/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(ci => productToAdd.id === ci.id)
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    )
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }]
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
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setExpanded: () => false,
  addItemToCart: () => {},
  increaseItemQuantity: () => {},
  decreaseItemQuantity: () => {},
  removeItemFromCart: () => {},
})

const INITIAL_STATE = {
  expanded: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_EXPANDED: 'SET_EXPANDED',
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_EXPANDED:
      return {
        ...state,
        expanded: payload
      }

    default:
      throw new Error(`unhandled type ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) => {
  const [ { cartItems, expanded, cartCount, cartTotal}, dispatch ] =
    useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsDispatch = (cartItems) => {
    const cartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    )
    const cartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    )
    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      { cartItems, cartCount, cartTotal }
    ))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsDispatch(newCartItems)
  }
  const decreaseItemQuantity = (productToDecrease) => {
    const newCartItems = decreaseItemQty(cartItems, productToDecrease)
    updateCartItemsDispatch(newCartItems)
  }
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    updateCartItemsDispatch(newCartItems)
  }

  const setExpanded = (expanded) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_EXPANDED, expanded))
  }

  const value = {
    expanded, cartItems, cartCount, cartTotal,
    setExpanded, addItemToCart, decreaseItemQuantity, removeItemFromCart,
  }

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}
