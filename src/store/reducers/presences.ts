/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';

interface EquipesState {
  presences : []
}

const initialState: EquipesState = {
  presences: [],
};
// Action asynchrone pour charger les équipes associées à l'ID de l'utilisateur
export const fetchPresencesForUser = createAppAsyncThunk(
  'presences/FETCH_PRESENCES_FOR_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userID = state.user.token.user.id; // Récupérez l'ID de l'utilisateur depuis le state
    const { data } = await axiosInstance.get(`/presences?userID=${userID}`);
    return data;
  },
);

const presencesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPresencesForUser.fulfilled, (state, action) => {
      // state.loading = false; // Indiquez que le chargement est terminé
      state.presences = action.payload;
    });
});
export default presencesReducer;
