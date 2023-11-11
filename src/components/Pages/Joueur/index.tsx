import React from 'react';
import './index.scss';
import Header from '../Home/Header';
import logo from '../../../assets/devbyou.png';

function Joueur() {
  return (
    <div>
      <Header />
      <div className="joueur__banniere">
        <img src={logo} alt="" />
        <h1>Robbert Pirès</h1>
      </div>
      <div className="joueur__banniere__informations">
        <h3>
          Information Personnelles
          <button type="button">Supprimer</button>
          <button type="button">Modifier photo</button>
          <button type="button">Modifier les informations</button>
        </h3>
      </div>
      <div className="joueur__banniere__div">
        <div className="joueur__bannier__div-card">
          <h3>
            Des classes
            <button type="button"> Modifier</button>
          </h3>
        </div>
      </div>

    </div>
  );
}

export default Joueur;
