import { createAction, createReducer } from '@reduxjs/toolkit';
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
    email: '',
    password: '',
    prenom: '',
    nom: '',
    tel: '',
    role: '',
  },
  ...userData,
};

export const inscription = createAppAsyncThunk(
  'inscription/INSCRIPTION',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
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

    localStorage.setItem('user', JSON.stringify(data));

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
      state.logged = action.payload.logged;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;

      state.credentials.email = '';
      state.credentials.password = '';
      state.isLoading = false;
    });
});
export default userReducer;
