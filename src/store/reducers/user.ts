import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
import { LoginResponse } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/user';

interface Equipe {
  // map(arg0: (joueur: any) => JSX.Element): unknown;
  id: number
  nom: string
  logo: string
  statut: string
  categorie_id: number
  joueurs: Joueur[]
  categories: Categories
  coaches_equipes: CoachesEquipes
}

interface Joueur {
  id: number
  nom: string
  prenom: string
  email: string
  derniere_activite: string | number
}

interface Categories {
  id: number
  nom: string
  tranche_age: string
  nombre_total: number
}

interface CoachesEquipes {
  created_at: string
  updated_at: string
  coach_id: number
  equipe_id: number
}
interface User {
  id:number;
  created_at: string;
  date_creation: string;
  email: string;
  last_activity: string;
  equipes: Equipe[];
  nom: string;
  password: string;
  prenom: string;
  role: string;
  statut: string;
  tel: string;
  updated_at: string;
}
interface UserState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: string;
  token: {
    token:string,
    user: User,
  };
  errorLogin: string | null;
  isLoading: boolean;
}
const userData = getUserDataFromLocalStorage();

export const initialState: UserState = {
  logged: false,
  pseudo: '',
  token: {
    token: '',
    user: {
      created_at: '',
      date_creation: '',
      email: '',
      last_activity: '',
      equipes: [
        {
          // id: 1,
          nom: '',
          logo: '',
          statut: '',
          // categorie_id: 1,
          joueurs: [
            {
              id: 1,
              nom: '',
              prenom: '',
              email: '',
              derniere_activite: '',
            },
            // ... autres joueurs
          ],
          categories: {
            // id: 1,
            nom: '',
            tranche_age: '',
            // nombre_total: ,
          },
          coaches_equipes: {
            created_at: '',
            updated_at: '',
            // coach_id: 1,
            // equipe_id: 1,
          },
        },
      ],
      nom: '',
      password: '',
      prenom: '',
      role: '',
      statut: '',
      tel: '',
      updated_at: '',
      id: 0,
    },
  },
  errorLogin: null,
  isLoading: false,
  credentials: {
    email: 'pierre.dupont@example.com',
    password: 'motdepasse1',
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
