import { useDispatch, useSelector } from 'react-redux'

import { CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Remove, Arrow, Value } from './checkout-item.styles.jsx'
import { addItemToCart, decreaseItemQuantity, removeItemFromCart } from '../../store/cart/cart.action.js'
import { selectCartItems } from '../../store/cart/cart.selector.js'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const handleRemoveItemFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem))
  const handleAddItemToCart = () => dispatch(addItemToCart(cartItems, cartItem))
  const handleDecreaseItemQuantity = () => dispatch(decreaseItemQuantity(cartItems, cartItem))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name> {name} </Name>
      <Quantity>
        <Arrow onClick={handleDecreaseItemQuantity}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={handleAddItemToCart}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <Remove onClick={handleRemoveItemFromCart}>&#10005;</Remove>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
