import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Inscription from '../Pages/Inscription';
import Connexion from '../Connexion';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCoaches } from '../../store/reducers/coaches';
import { findAllCategories } from '../../store/reducers/categories';

function App() {
  const logged = useAppSelector((state) => state.user.logged);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (logged) {
        dispatch(fetchCoaches());
      }
    }, 30 * 60 * 1000); // 30 minutes en millisecondes
    dispatch(findAllCategories());
    // Nettoie l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [dispatch, logged]);
  const categories = useAppSelector((state) => state.categories.categories);
  const categorie = categories.map((cat) => cat.nom);
  return (
    <div className="content__connexion">
      {
        logged

          ? (
            <div className="content">
              <SideBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/equipes" element={<Equipes />} />
                <Route path="/presents" element={<Presents />} />
                <Route path="/parametre" element={<Parametre />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/profil" element={<Profil />} />
                { categorie.map((cat) => <Route key={cat} path={`/equipes/${cat}`} element={<Equipe />} />)}
                <Route path="/equipes/senior/joueur" element={<Joueur />} />
                <Route path="/pageJoueur" element={<QRCodeReader />} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </div>
          )
          : (
            <Routes>
              <Route path="/" element={<Connexion />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          )

            }

    </div>
  );
}

export default App;
