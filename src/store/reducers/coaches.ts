import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
// import { fetchCoaches } from './coachesActions';

export const fetchCoaches = createAsyncThunk('coaches/fetchCoaches', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/coaches');
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

const coachesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCoaches.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCoaches.fulfilled, (state, action) => {
      state.loading = false;
      state.coaches = action.payload;
    })
    .addCase(fetchCoaches.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.error.message;
    });
});

export default coachesReducer;
