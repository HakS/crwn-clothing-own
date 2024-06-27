import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { setExpanded } from '../../store/cart/cart.reducer';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGoToCheckout = () => {
    navigate('/checkout')
    dispatch(setExpanded(false))
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
