import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { expanded, setExpanded, cartCount } = useContext(CartContext)

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='cart-icon-container' onClick={handleToggle}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon
