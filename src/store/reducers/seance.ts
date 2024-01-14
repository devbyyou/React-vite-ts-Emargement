/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';

interface SeanceState {
  credentials:any
}

const initialState: SeanceState = {
  credentials: {
    equipe_id: 0,
    adresse: '',
    ville: '',
    categorie_id: '',
    statut: '',
    recurringDates: [],
  },
};

export const changeCredentialsField = createAction<{
  value:any ;
  field: keyof SeanceState['credentials']
}>('equipes/CHANGE_CREDENTIALS_FIELD');

export const addSeance = createAppAsyncThunk(
  'seance/ADD_SEANCE',
  async ({
    categorie_id,
    statut,
    adresse,
    ville,
    recurringDates,
  }:{
    equipe_id: number,
    categorie_id:number,
    statut:string,
    adresse:string,
    ville:string,
    recurringDates:any,
  }, thunkAPI) => {
    const state = thunkAPI.getState();
    const {
      equipe_id,
    } = state.seance.credentials;
    const response = await axiosInstance.post(`/seances/${equipe_id}`, {
      equipe_id,
      categorie_id,
      statut,
      adresse,
      ville,
      recurringDates,
    });
    return response.data;
  },
);

const seanceReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(addSeance.fulfilled, (state, action) => {
      state.credentials = action.payload;
    });
});
export default seanceReducer;
