import { createReducer } from '@reduxjs/toolkit';
import { categories } from '../../data/data2.json';
// import categoriesData from '../../data/data';
import { Category } from '../../@types/types2';

interface CategoriesState {
  categories: Category[]
}

const initialState: CategoriesState = {
  categories,
};

const categoriesReducer = createReducer(initialState, () => {

});
export default categoriesReducer;
