import { useNavigate } from 'react-router-dom';
import React from 'react';
import LoginForm from '../Pages/LoginForm';
import { changeCredentialsField, login } from '../../store/reducers/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './index.scss';

function Connexion() {
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
    // setInterval(() => {
    // }, 1000);
    dispatch(login());
  };
  return (
    <div className="connexion__content">
      <div className="login">
        <h1> Connexion à QrEmargement</h1>
        <LoginForm
          email={email}
          password={password}
          changeField={handleChangeField}
          handleLogin={handleLogin}
          handleLogout={() => {}}
        />
      </div>
    </div>
  );
}

export default Connexion;
