import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss'

const Category = () => {
  const { category } = useParams()
  const isLoading = useSelector(selectCategoriesIsLoading)
  const categoriesMap = useSelector(selectCategoriesMap)

  return (
    <>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      { isLoading ? <Spinner /> :
        <div className="category-container">
          {(categoriesMap[category])?.map((product) =>
            <ProductCard key={product.id} product={product} />
          )}
        </div> }
    </>
  )
}

export default Category
