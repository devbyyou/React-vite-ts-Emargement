/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SideBar from '../SideBar';
import './styles.scss';
import Home from '../Pages/Home';
import Equipes from '../Pages/Equipes';
import Presents from '../Pages/Presents';
import Parametre from '../Pages/Parametre';
import Profil from '../Pages/Profil';
import Equipe from '../Pages/Equipe';
import Joueur from '../Pages/Joueur';
import QRCodeReader from '../QrCode/QRCodeReader';
// import Inscription from '../Pages/Inscription';
import Connexion from '../Connexion';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { fetchCoaches } from '../../store/reducers/coaches';
import { fetchEquipesForUser } from '../../store/reducers/equipes';
import { fetchApi } from '../../store/reducers/api';
// import { findAllCategories } from '../../store/reducers/categories';

function App() {
  const navigate = useNavigate();
  const logged = useAppSelector((state) => state.user.logged);
  const token = useAppSelector((state) => state.user.token);
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const { joueur, user } = token;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (logged) {
        dispatch(fetchApi());
      }
    }, 20 * 60 * 1000); // 20 minutes en millisecondes
    if (logged) {
      dispatch(fetchEquipesForUser());
      // dispatch(deleteEquipesForUser());
    }
    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [dispatch, logged]);

  const listeEquipeId : number[] = equipes.map((listesEquipes) => listesEquipes.id);
  if (logged && user) {
    if (listeEquipeId.includes(0)) {
      return <div>Loading...</div>;
    }
  }
  const hasRedirected = localStorage.getItem('hasRedirected');

  if (logged && joueur && !hasRedirected) {
    navigate('/pageJoueur');
    localStorage.setItem('hasRedirected', 'true');
  }
  return (
    <div className="content__connexion">
      { logged && user ? (
        <div className="content">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipes" element={<Equipes />} />
            <Route path="/presents" element={<Presents />} />
            <Route path="/parametre" element={<Parametre />} />
            {/* <Route path="/inscription" element={<Inscription />} /> */}
            <Route path="/profil" element={<Profil />} />
            { equipes.map((listesEquipes) => (
              <Route
                key={listesEquipes.id}
                path={`/equipes/:${listesEquipes.categories.nom}/:${listesEquipes.id}`}
                element={<Equipe />}
              />
            ))}
            { equipes.map((listesEquipes) => {
              const { joueurs } = listesEquipes;
              return joueurs.map((player) => <Route key={player.id} path={`/equipes/joueur/:${player.categorie_id}/:${player.id}`} element={<Joueur />} />);
            })}

            {/* <Route path="/pageJoueur" element={<QRCodeReader />} /> */}
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      ) : logged && joueur ? (
        <div className="content">
          <SideBar />
          <Routes>
            <Route path="/parametre" element={<Parametre />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/pageJoueur" element={<QRCodeReader />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
