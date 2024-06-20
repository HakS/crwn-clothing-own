import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, setExpanded } = useContext(CartContext)
  const navigate = useNavigate()

  const handleGoToCheckout = () => {
    navigate('/checkout')
    setExpanded(false)
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length
          ? cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
          : <EmptyMessage>Your cart is empty</EmptyMessage>
        }
      </CartItems>
      <Button onClick={handleGoToCheckout}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
