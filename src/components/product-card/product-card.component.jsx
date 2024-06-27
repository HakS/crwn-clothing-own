import { useDispatch } from 'react-redux'

import './product-card.styles.scss'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { addItemToCart } from '../../store/cart/cart.reducer';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const dispatch = useDispatch()

  const handleAddToCard = (event) => {
    dispatch(addItemToCart(product))
  }

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={handleAddToCard}>Add to card</Button>
    </div>
  )
}

export default ProductCard
