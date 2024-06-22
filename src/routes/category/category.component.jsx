import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import './category.styles.scss'

const Category = () => {
  const { category } = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)

  return (
    <>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className="category-container">
        {(categoriesMap[category])?.map((product) =>
          <ProductCard key={product.id} product={product} />
        )}
      </div>
    </>
  )
}

export default Category
