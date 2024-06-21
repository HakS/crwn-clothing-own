import { CartIconContainer, StyledShoppingIcon, ItemCount } from './cart-icon.styles'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { expanded, setExpanded, cartCount } = useContext(CartContext)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <CartIconContainer onClick={handleToggle}>
      <StyledShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
