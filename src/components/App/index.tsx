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
import { useAppSelector } from '../../hooks/redux';

function App() {
  const logged = useAppSelector((state) => state.user.logged);

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
                <Route path="/equipes/senior" element={<Equipe />} />
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
