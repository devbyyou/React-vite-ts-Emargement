import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Home from '../Home';
// import Equipes from '../Equipes';
import './index.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/devbyyou.png';

function SideBar() {
  return (
    <nav className="sidebar">
      <img className="logo" src={logo} alt="logo" />
      <Link to="/">Home</Link>
      <Link to="/Equipes">Equipes</Link>
      <Link to="/Presents">Presents</Link>
      <Link to="/Parametre">Parametre</Link>
    </nav>
  );
}

export default SideBar;
