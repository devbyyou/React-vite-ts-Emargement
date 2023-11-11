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

function App() {
  return (
    <div className="content">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/presents" element={<Presents />} />
        <Route path="/parametre" element={<Parametre />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/equipes/senior" element={<Equipe />} />
        <Route path="/equipes/senior/joueur" element={<Joueur />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
