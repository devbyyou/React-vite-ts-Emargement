/* eslint-disable no-console */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { User } from '../../@types/user';
import { createAppAsyncThunk } from '../../utils/redux';

interface UserState {
  user: User,
  credentials: {
    email: string;
    password: string;
    prenom:string;
    nom:string;
    tel:string;
    role:string;
    logo:string;
    banniere:string;
  };
}
const initialState: UserState = {
  user: {
    email: '',
    password: '',
    prenom: '',
    nom: '',
    tel: '',
    role: '',
    logo: '',
    created_at: '',
    date_creation: 0,
    last_activity: '',
    equipes: [],
    banniere: '',
    statut: '',
    updated_at: '',
    id: 0,
    session_id: null,
  },
  credentials: {
    email: '',
    password: '',
    prenom: '',
    nom: '',
    tel: '',
    role: 'Entraineur',
    logo: '',
    banniere: '',

  },

};
export const updateCoache = createAppAsyncThunk(
  'coaches/UPDATE_COACHE',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const userId = state.user.token.user.id;
    const {
      email, password, prenom,
      nom,
      tel,
      role,
      logo,
      banniere,
    } = state.coaches.credentials;
    const { data } = await axiosInstance.put(`/coaches/${userId}`, {
      email,
      password,
      prenom,
      nom,
      tel,
      role,
      logo,
      banniere,
    });

    return data;
  },
);
export const fetchCoaches = createAppAsyncThunk(
  'coaches/GET_COACHE',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const userId = state.user.token.user.id;

    const { data } = await axiosInstance.get(`/coaches/${userId}`);

    return data;
  },
);
export const changeCredentialsField = createAction<{
  field:keyof UserState['credentials'];
  value: string
}>('coaches/CHANGE_CREDENTIALS_FIELD');
const coachesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCoache.pending, () => {

    })
    .addCase(updateCoache.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    .addCase(updateCoache.rejected, () => {
      // state.error = action.error.message;
    })
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      // state.error = action.error.message;
      state.credentials[field] = value;
    })
    .addCase(fetchCoaches.fulfilled, (state, action) => {
      state.user = action.payload;
      // state.user.nom = action.payload;
    });
});

export default coachesReducer;
