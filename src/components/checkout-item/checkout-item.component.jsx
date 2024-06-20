import { useContext } from 'react'
import { CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Remove, Arrow, Value } from './checkout-item.styles.jsx'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem
  const { removeItemFromCart, addItemToCart, decreaseItemQuantity } = useContext(CartContext)

  const handleRemoveItemFromCart = () => removeItemFromCart(cartItem)
  const handleAddItemToCart = () => addItemToCart(cartItem)
  const handleDecreaseItemQuantity = () => decreaseItemQuantity(cartItem)

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
      <Remove onClick={handleRemoveItemFromCart}>&#1005;</Remove>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem
