import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { fetchCategoriesStart } from '../../store/categories/category.reducer';

import './shop.styles.scss'

const Shop = () => {
  const dispatch = useDispatch()
  dispatch(fetchCategoriesStart())

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop
