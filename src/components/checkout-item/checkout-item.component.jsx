import { useContext } from 'react'
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem
  const { removeItemFromCart, addItemToCart, decreaseItemQuantity } = useContext(CartContext)

  const handleRemoveItemFromCart = () => removeItemFromCart(cartItem)
  const handleAddItemToCart = () => addItemToCart(cartItem)
  const handleDecreaseItemQuantity = () => decreaseItemQuantity(cartItem)

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecreaseItemQuantity}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleAddItemToCart}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={handleRemoveItemFromCart}>&#1005;</span>
    </div>
  )
}

export default CheckoutItem
