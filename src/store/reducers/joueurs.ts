/* eslint-disable @typescript-eslint/naming-convention */
import { createReducer } from '@reduxjs/toolkit';
import { Joueur } from '../../@types/user';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';

interface JoueursState {
  joueurs: Joueur
  credentials: {
    equipe_id:number
    nom: string,
    prenom: string,
    categorieId: string,
    categorie_id:number | string
    logo: string,
    statut: string,
    email: string,
    tel: string,
    age: 20,
  },
}

const initialState: JoueursState = {
  joueurs: {
    created_at: '',
    id: 1,
    nom: '',
    prenom: '',
    email: '',
    tel: 0,
    derniere_activite: '',
    date_creation: '',
    equipe: [],
    statut: '',
    logo: '',
    categorie_id: 1,
    role: '',
    age: 1,
    etat: '',
    // categorie: [],
    // nom_prenom_tel_parent: 'string',
    // total_presence: 1,
    // dates_heures_absence: [],
    // mot_de_passe: 'string',
    // nombre_total_joueur: 1,
  },
  credentials: {
    equipe_id: 1,
    nom: '',
    prenom: '',
    categorie_id: '',
    logo: '',
    statut: 'active',
    email: '',
    // age: '',
    age: 20,
    tel: '',
    categorieId: '',
  },
};
export const createJoueurForEquipe = createAppAsyncThunk(
  'joueurs/CREATE_JOUEURS_FOR_USER',
  async (equipeId, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // const userID = state.user.token.user.id; // Récupérez l'ID de l'utilisateur depuis le state
    // Je récupère mon email et mon mot de passe
    const {
      nom, categorie_id, logo, statut, age, prenom, email, tel, equipe_id,
    } = { ...state.equipes.credentials };
    const { data } = await axiosInstance.post(`/joueurs/${equipeId}`, {
      nom,
      categorie_id,
      logo,
      statut,
      age,
      prenom,
      email,
      tel,
      equipe_id,
    });

    return data;
  },
);
export const updateJoueurForUser = createAppAsyncThunk(
  'joueurs/UPDATE_JOUEURS_FOR_USER',
  async (equipeId, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // const userID = state.user.token.user.id; // Récupérez l'ID de l'utilisateur depuis le state
    // Je récupère mon email et mon mot de passe
    const {
      nom, categorie_id, logo, statut, age, prenom, email, tel, equipe_id,
    } = state.equipes.credentials;
    const { data } = await axiosInstance.put(`/joueurs/${equipeId}`, {
      nom,
      categorie_id,
      logo,
      statut,
      age,
      prenom,
      email,
      tel,
      equipe_id,
    });

    return data;
  },

);
export const deleteJoueurs = createAppAsyncThunk(
  'joueurs/DELETE_JOUEURS',
  async (joueurId) => {
    const { data } = await axiosInstance.delete(`/joueurs/${joueurId}`);

    return data;
  },

);
export const updateJoueurs = createAppAsyncThunk(
  'joueurs/UPDATE_JOUEURS',
  async (_, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials
    const state = thunkAPI.getState();
    // Je récupère mon email et mon mot de passe
    const userId = state.user.token.joueur.id;
    const {
      email, password, prenom,
      nom,
      tel,
      role,
      logo,
      banniere,
    } = state.coaches.credentials;
    const { data } = await axiosInstance.put(`/player/${userId}`, {
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
const joueursReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createJoueurForEquipe.fulfilled, (state, action) => {
      // eslint-disable-next-line no-alert
      alert(`Ajout de ${state.credentials.prenom} ${state.credentials.nom} Avec succès ! :)`);
      // state.loading = false; // Indiquez que le chargement est terminé
      state.joueurs = action.payload;
      state.credentials.nom = '';
      state.credentials.prenom = '';
      state.credentials.email = '';
      state.credentials.tel = '';
      state.credentials.logo = '';
      state.credentials.categorieId = '';
      state.credentials.logo = '';
    })
    .addCase(updateJoueurForUser.fulfilled, (state, action) => {
      // state.loading = false; // Indiquez que le chargement est terminé
      state.joueurs = action.payload;
    })
    .addCase(deleteJoueurs.fulfilled, (state, action) => {
      // state.loading = false; // Indiquez que le chargement est terminé
      state.joueurs = action.payload;
    })
    .addCase(updateJoueurs.fulfilled, (state, action) => {
      state.joueurs = action.payload;
    });
});

export default joueursReducer;
