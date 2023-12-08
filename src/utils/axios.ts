import axios from 'axios';
// import { useEffect } from 'react';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from './user';

// Je créer une instance d'axios me permettant d'enregistrer
// une configuration de base
// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});
// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    // Si la réponse a un statut 401, le token est probablement expiré
    if (status === 400 || 401 || 403) {
      console.log('Token expiré. Déconnexion de l\'utilisateur.');

      // Vous pouvez ajouter ici la logique de déconnexion appropriée
      // Par exemple, vous pourriez rediriger l'utilisateur vers la page de connexion
      // ou effectuer d'autres actions de nettoyage.

      removeUserDataFromLocalStorage();
      window.location.reload();
    }

    // Propagez l'erreur pour que le code appelant puisse également la gérer
    return Promise.reject(error);
  },
);
// Je peu agir avant qu'une requête soit envoyé
axiosInstance.interceptors.request.use((config) => {
  // Je récupère les données utilisateur
  const userData = getUserDataFromLocalStorage();

  // Si mon utilisateur est connecté, je lui ajoute un header Authorization
  // const token = userData ? userData.token : null;

  // console.log('Token:', userData.token.token);
  //   eslint-disable-next-line no-param-reassign
  config.headers.Authorization = userData ? `Bearer ${userData.token.token}` : null;

  return config;
});
