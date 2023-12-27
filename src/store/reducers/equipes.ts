import { createAction, createReducer } from '@reduxjs/toolkit';
// import { equipes } from '../../data/data2.json';
// import { redirect } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Equipe } from '../../@types/user';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';
// import { Equipe } from '../../@types/types2';

interface EquipesState {
  equipes: Equipe[]
  isOpen: boolean,
  credentials: {
    nom: string,
    categorieId: string | number,
    logo:string
    statut:string
  },

}

const initialState: EquipesState = {
  equipes: [
    {
      id: 1,
      nom: '',
      logo: '',
      statut: '',
      categorie_id: 1,
      created_at: '',
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
        id: 1,
        nom: '',
        tranche_age: '',
        nombre_total: 0,
      },
      coaches_equipes: {
        created_at: '',
        updated_at: '',
        coach_id: 1,
        equipe_id: 1,
      },
    },
  ],
  isOpen: true,
  credentials: {
    nom: '',
    categorieId: '',
    logo: '',
    statut: 'active',
  },

};

export const updateequipes = createAction('equipes/UPDATE_EQUIPES');
export const toggleIsOpen = createAction('equipes/TOGGLE_IS_OPEN');
export const changeCredentialsField = createAction<{
  value:string;
  field: keyof EquipesState['credentials']
}>('equipes/CHANGE_CREDENTIALS_FIELD');

export const createEquipe = createAppAsyncThunk(
  'equipes/CREATE_EQUIPE',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const {
      nom, categorieId, logo, statut,
    } = state.equipes.credentials;
    const { data } = await axiosInstance.post('/equipes', {
      nom,
      categorieId,
      logo,
      statut,
    });

    return data;
  },
);
// Action asynchrone pour charger les équipes associées à l'ID de l'utilisateur
export const fetchEquipesForUser = createAppAsyncThunk(
  'equipes/FETCH_EQUIPES_FOR_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userID = state.user.token.user.id; // Récupérez l'ID de l'utilisateur depuis le state
    const { data } = await axiosInstance.get(`/equipes?userID=${userID}`);
    return data;
  },
);
export const updateEquipesForUser = createAppAsyncThunk(
  'equipes/UPDATE_EQUIPES_FOR_USER',
  async (equipeId, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // const userID = state.user.token.user.id; // Récupérez l'ID de l'utilisateur depuis le state
    // Je récupère mon email et mon mot de passe
    const {
      nom, categorieId, logo, statut,
    } = state.equipes.credentials;
    const { data } = await axiosInstance.put(`/equipes/${equipeId}`, {
      nom,
      categorieId,
      logo,
      statut,
    });

    return data;
  },

);
export const deleteEquipesForUser = createAppAsyncThunk(
  'equipes/DELETE_EQUIPES_FOR_USER',
  async (equipeId) => {
    const { data } = await axiosInstance.delete(`/equipes/${equipeId}`);

    return data;
  },

);
const equipeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleIsOpen, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(createEquipe.fulfilled, (state) => {
      // J'enregistre les informations retourner par mon API
      // state.equipe = action.payload.equipe;
      // state.categorie = action.payload.categorie;
      // state.logo = action.payload.logo;
      // state

      // Je réinitialiser les credentials
      state.credentials.nom = '';
      state.credentials.categorieId = '';
      state.credentials.logo = '';
    })
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(fetchEquipesForUser.fulfilled, (state, action) => {
      // state.loading = false; // Indiquez que le chargement est terminé
      state.equipes = action.payload;
    })
    .addCase(updateEquipesForUser.fulfilled, (state, action) => {
      // state.loading = false; // Indiquez que le chargement est terminé
      state.equipes = action.payload;
    })
    .addCase(deleteEquipesForUser.fulfilled, (state, action) => {
      // state.loading = false; // Indiquez que le chargement est terminé
      state.equipes = action.payload;
    });
});
export default equipeReducer;
