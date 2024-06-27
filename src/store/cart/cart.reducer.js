import { createSlice } from "@reduxjs/toolkit"

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

const INITIAL_STATE = {
  expanded: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart(state, action) { state.cartItems = addCartItem(state.cartItems, action.payload) },
    decreaseItemQuantity(state, action) { state.cartItems = decreaseItemQty(state.cartItems, action.payload) },
    removeItemFromCart(state, action) { state.cartItems = removeCartItem(state.cartItems, action.payload) },
    setExpanded(state, action) { state.expanded = action.payload },
  }
})

export const {
  addItemToCart,
  decreaseItemQuantity,
  removeItemFromCart,
  setExpanded,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
