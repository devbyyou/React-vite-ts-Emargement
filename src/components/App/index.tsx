import { Route, Routes } from 'react-router-dom';
import SideBar from '../SideBar';
import './styles.scss';
import Home from '../Pages/Home';
import Equipes from '../Pages/Equipes';
import Presents from '../Pages/Presents';
import Parametre from '../Pages/Parametre';
import Profil from '../Pages/Profil';

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
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
