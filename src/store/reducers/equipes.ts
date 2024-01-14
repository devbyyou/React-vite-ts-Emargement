/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { Equipe } from '../../@types/user';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';

interface EquipesState {
  equipes: Equipe[]
  isOpen: boolean,
  // credentials: {
  //   equipe_id:number
  //   nom: string,
  //   prenom: string,
  //   email:string,
  //   tel:string,
  //   age:number,
  //   categorie_id: string | number,
  //   logo:string
  //   statut:string
  // },
  credentials: any,

}

const initialState: EquipesState = {
  equipes: [
    {
      id: 0,
      nom: '',
      logo: '',
      statut: '',
      categorie_id: 1,
      created_at: '',
      seances: [],
      joueurs: [
        {
          created_at: '',
          id: 1,
          nom: 'string',
          prenom: 'string',
          email: 'string',
          tel: 0,
          derniere_activite: 'string',
          date_creation: 'string',
          equipe: [],
          statut: 'string',
          logo: 'string',
          categorie_id: 1,
          role: 'string',
          age: 1,
          etat: 'string',
          equipe_id: 1,
          password: '',
          updated_at: 1,
        },
      ],
      categories: {
        id: '',
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
    equipe_id: 1,
    nom: '',
    prenom: '',
    categorie_id: 1,
    logo: '',
    statut: 'active',
    email: '',
    tel: '',
    age: 20,
  },

};

export const updateequipes = createAction('equipes/UPDATE_EQUIPES');
export const toggleIsOpen = createAction('equipes/TOGGLE_IS_OPEN');
export const changeCredentialsField = createAction<{
  value:any ;
  field: keyof EquipesState['credentials']
}>('equipes/CHANGE_CREDENTIALS_FIELD');

export const createEquipe = createAppAsyncThunk(
  'equipes/CREATE_EQUIPE',
  async ({ logo }:{ logo:string }, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const {
      nom, categorie_id, statut,
    } = state.equipes.credentials;

    const { data } = await axiosInstance.post('/equipes', {
      logo, nom, categorie_id, statut,
    });
    return data;
  },
);
export const fetchEquipesForUser = createAppAsyncThunk(
  'equipes/FETCH_EQUIPES_FOR_USER',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userID = state.user.token.user.id;
    const { data } = await axiosInstance.get(`/equipes?userID=${userID}`);
    return data;
  },
);
export const updateEquipesForUser = createAppAsyncThunk(
  'equipes/UPDATE_EQUIPES_FOR_USER',
  async ({ logo, equipeId }: { logo: string, equipeId: string | undefined }, thunkAPI) => {
    const state = thunkAPI.getState();

    const {
      nom, categorie_id, statut,
    } = state.equipes.credentials;
    const { data } = await axiosInstance.put(`/equipes/${equipeId}`, {
      nom,
      categorie_id,
      logo,
      statut,
    });

    return data;
  },

);
export const deleteEquipesForUser = createAppAsyncThunk(
  'equipes/DELETE_EQUIPES_FOR_USER',
  async ({ equipeId }:{ equipeId: string | undefined }) => {
    const { data } = await axiosInstance.delete(`/equipes/${equipeId}`);

    return data;
  },

);
const equipeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleIsOpen, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(createEquipe.fulfilled, () => {
      alert('Creation de l\'equipe ! ');
    })
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      // Traitez le champ logo différemment (stockez la chaîne de base64)
      if (field === 'logo') {
        state.credentials[field] = value;
      } else {
        // Traitez les autres champs normalement
        state.credentials[field] = value;
      }
    })
    .addCase(fetchEquipesForUser.fulfilled, (state, action) => {
      // state.loading = false;
      // alert('fetchEquipesForUser 1 fulfilled');
      state.equipes = action.payload;
      // alert('fetchEquipesForUser 2 fulfilled');
    })
    .addCase(updateEquipesForUser.fulfilled, (state, action) => {
      // state.loading = false;
      // eslint-disable-next-line no-alert
      alert('Modification de l\'equipe ! ');
      state.equipes = action.payload;
      // alert('1');
    })
    .addCase(deleteEquipesForUser.fulfilled, (state, action) => {
      // state.loading = false;
      state.equipes = action.payload;
    });
});
export default equipeReducer;
