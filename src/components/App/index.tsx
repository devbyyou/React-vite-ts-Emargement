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
import LoginForm from '../Pages/LoginForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCredentialsField } from '../../store/reducers/user';
import QRCodeReader from '../QrCode/QRCodeReader';

function App() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const handleChangeField = (value: string, field: 'email' | 'password') => {
    dispatch(changeCredentialsField({
      value,
      field,
    }));
  };

  const handleLogin = () => {

  };

  return (
    <div>
      <div className="login">
        <LoginForm
          email={email}
          password={password}
          changeField={handleChangeField}
          handleLogin={handleLogin}
          handleLogout={() => {}}
        />
      </div>
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
          <Route path="/pageJoueur" element={<QRCodeReader />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
