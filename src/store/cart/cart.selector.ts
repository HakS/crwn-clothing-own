import { createSelector } from "reselect"
import { CartState } from "./cart.reducer"
import { RootState } from "../store"


const selectCartReducer = (state: RootState): CartState => state.cart

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
)

export const selectExpanded = createSelector(
  [selectCartReducer],
  (cart) => cart.expanded
)

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity, 0
  )
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
  )
)
