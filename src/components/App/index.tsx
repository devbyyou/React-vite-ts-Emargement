import { Route, Routes } from 'react-router-dom';
import SideBar from '../SideBar';
import './styles.scss';
import Home from '../Home';
import Equipes from '../Equipes';
import Presents from '../Presents';
import Parametre from '../Parametre';

function App() {
  return (
    <div className="content">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/presents" element={<Presents />} />
        <Route path="/Parametre" element={<Parametre />} />
      </Routes>
    </div>
  );
}

export default App;
