import { createAction, createReducer } from '@reduxjs/toolkit';
// import { useEffect } from 'react';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/user';

interface UserState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
    prenom:string;
    nom:string;
    tel:string;
    role:string;
  };
  pseudo: string;
  token: { token:string };
  errorLogin: string | null;
  isLoading: boolean;
}
const userData = getUserDataFromLocalStorage();

export const initialState: UserState = {
  logged: false,
  pseudo: '',
  token: { token: '' },
  errorLogin: null,
  isLoading: false,
  credentials: {
    email: 'lyy.pro@gmail.com',
    password: 'motdepasse123',
    prenom: 'youssouf',
    nom: 'ly',
    tel: '123456789',
    role: 'Entraineur',
  },
  ...userData,
};

export const inscription = createAppAsyncThunk(
  'inscription/INSCRIPTION',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const {
      email, password, prenom,
      nom,
      tel,
      role,
    } = state.inscription.credentials;
    const { data } = await axiosInstance.post('/inscription', {
      email,
      password,
      prenom,
      nom,
      tel,
      role,
    });

    // Pour sauvegarde mes informations, je transforme mon objet en chaine de caractère
    // Je stocke cette chaine de caractère dans le localStorage
    localStorage.setItem('user', JSON.stringify(data));

    // Je type les données que je renvoie pour que le type soit transmis
    // dans la fonction de reducer
    return data as LoginResponse;
  },
);

export const changeCredentialsField = createAction<{
  value:string;
  field: keyof UserState['credentials']
}>('inscription/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(inscription.fulfilled, (state, action) => {
      // J'enregistre les informations retourner par mon API
      state.logged = action.payload.logged;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;

      // Je réinitialiser les credentials
      state.credentials.email = '';
      state.credentials.password = '';
      state.isLoading = false;
    });
});
export default userReducer;
