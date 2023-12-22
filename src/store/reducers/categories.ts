import { createReducer } from '@reduxjs/toolkit';

import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { Categories } from '../../@types/user';

interface CategoriesState {
  categories: Categories[]
}

const initialState: CategoriesState = {
  categories: [],
};

export const findAllCategories = createAppAsyncThunk(
  'categories/FETCH_CATEGORIES',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      // Gérer les erreurs ici
      console.error(error);
      throw error;
    }
  },
);

const categoriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(findAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
});
export default categoriesReducer;
