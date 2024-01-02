/* eslint-disable no-console */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
// import { fetchApi } from './coachesActions';

export const fetchApi = createAsyncThunk('api/fetchApi', async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    // Gérer les erreurs ici
    console.error(error);
    throw error;
  }
});

const initialState = {
  coaches: [],
  loading: false,
  error: null,
};

const ApiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchApi.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchApi.fulfilled, (state, action) => {
      state.loading = false;
      state.coaches = action.payload;
    })
    .addCase(fetchApi.rejected, (state) => {
      state.loading = false;
      // state.error = action.error.message;
    });
});

export default ApiReducer;
