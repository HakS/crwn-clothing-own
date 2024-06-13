import { useContext } from 'react'
import Button from '../button/button.component'
import './product-card.styles.scss'
import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product
  const { addItemToCart, setExpanded } = useContext(CartContext)

  const handleAddToCard = (event) => {
    addItemToCart(product)
    setExpanded(true)
  }

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleAddToCard}>Add to card</Button>
    </div>
  )
}

export default ProductCard
