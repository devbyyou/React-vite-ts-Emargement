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
  },
  ...userData,
};

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const { email, password } = state.user.credentials;
    const { data } = await axiosInstance.post('/login', {
      email,
      password,
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
}>('user/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retourner par mon API
      // console.log(action.payload);
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
