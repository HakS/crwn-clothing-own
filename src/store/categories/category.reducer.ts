import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from './category.types'

export type CategoriesState = {
  readonly categories: Category[],
  readonly isLoading: boolean,
  readonly error: Error | null
}

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoriesSlice = createSlice({
  name: 'category',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state) { state.isLoading = true },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
      state.isLoading = false
    },
    fetchCategoriesFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload
      state.isLoading = false
    }
  },
})

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed
} = categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer
