import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(ci => productToAdd.id === ci.id)
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
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


export const addItemToCart = (cartItems, productToAdd) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    addCartItem(cartItems, productToAdd)
  )

export const decreaseItemQuantity = (cartItems, productToDecrease) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    decreaseItemQty(cartItems, productToDecrease)
  )

export const removeItemFromCart = (cartItems, productToRemove) =>
  createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    removeCartItem(cartItems, productToRemove)
  )


export const setExpanded = (bool) => createAction(
  CART_ACTION_TYPES.SET_EXPANDED, bool
)
