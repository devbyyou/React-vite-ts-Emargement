// attendanceSlice.js
import { createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { createAppAsyncThunk } from '../../utils/redux';

interface GraphState {
  status: string,
  monthlyData: null,
  error: null,
}
const initialState : GraphState = {
  status: 'idle',
  monthlyData: null,
  error: null,
};
export const fetchMonthlyData = createAppAsyncThunk(
  'attendance/fetchMonthlyData',
  async (seance_id, _) => {
    const response = await axiosInstance.get(`/presences/${seance_id}`);
    return response.data;
  },
);
const attendanceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMonthlyData.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchMonthlyData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.monthlyData = action.payload;
    })
    .addCase(fetchMonthlyData.rejected, (state, action) => {
      state.status = 'failed';
    //   state.error = action.error.message;
    });
});

export default attendanceReducer;
