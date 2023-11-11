import React from 'react';
import './index.scss';
import { MdBolt } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import Header from '../Home/Header';
import logo from '../../../assets/devbyyou.png';
// import MembersList from '../Home/MembersList';

function Equipe() {
  return (
    <div>
      <Header />
      <div className="equipe__content">
        <div className="equipe__content__informations">
          <div className="equipe__content__information-club">
            <div className="equipe__content__information-statut">
              <h3>Sénior</h3>
              <p>Nom: Sénior</p>
              <p> Crée : 24-02-1996</p>
              <p>Statut : Actif</p>
              <p>Entraineur: Robbert</p>
            </div>
            <div className="equipe__content__information-logo">
              <img src={logo} alt="" />
              <button type="button">Modifier</button>
            </div>
          </div>
          <div className="equipe__content__information-effectif">
            <div className="header">
              <h2 className="titleMembre">Membres</h2>

            </div>

            <div className="search-bar">
              <CiSearch className="logo__search_members-equipe" />
              <input type="text" placeholder="Rechercher par nom" />
            </div>
            <div className="table">
              <div className="row label">
                <div className="cell">Nom</div>
                <div className="cell">Catégories</div>
                <div className="cell">Dernière Activité</div>
              </div>

              <Link to="/equipes/senior/joueur" className="row">
                <div className="cell">
                  John Doe
                  <div className="table__email">letsgo@gmail.com</div>
                </div>
                <div className="cell owner">. Sénior</div>
                <div className="cell">2 m ago</div>
              </Link>

            </div>
          </div>
        </div>

        <div className="equipe__content-action">
          <div className="equipe__content-action-card">

            <h3>
              <MdBolt />
              Actions
            </h3>
            <button type="button">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipe;
