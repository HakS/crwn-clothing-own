import { useDispatch, useSelector } from 'react-redux';

import { CartIconContainer, StyledShoppingIcon, ItemCount } from './cart-icon.styles'
import { setExpanded } from '../../store/cart/cart.reducer';
import { selectExpanded, selectCartCount } from '../../store/cart/cart.selector';

const CartIcon = () => {
  const expanded = useSelector(selectExpanded)
  const cartCount = useSelector(selectCartCount)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(setExpanded(!expanded))
  }

  return (
    <CartIconContainer onClick={handleToggle}>
      <StyledShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
