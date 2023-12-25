import React, { useEffect } from 'react';
import './index.scss';
import { MdBolt } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
import Header from '../Home/Header';
import logo from '../../../assets/devbyyou.png';
import { useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';
// import MembersList from '../Home/MembersList';

function Equipe() {
  const { U17 } = useParams();
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const token = useAppSelector((state) => state.user.token.user);
  const equipe = equipes.find((eq) => eq.categories.nom === U17);
  console.log(equipe);

  useEffect(() => {
    // Ajoutez une logique pour charger les données de l'équipe si elles ne sont pas déjà chargées
  }, [U17]);

  if (!equipe) {
    // Gestion du cas où l'équipe n'est pas encore chargée
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <div className="equipe__content">
        <div className="equipe__content__informations">
          <div className="equipe__content__information-club">
            <div className="equipe__content__information-statut">
              <h3>{equipe.categories.nom}</h3>
              <p>
                Nom:
                {' '}
                {equipe.categories.nom}
              </p>
              <p>
                {' '}
                Crée :
                {' '}
                {`${functionConverteDate.convertDatee(equipe.created_at)} `}
                {/* {equipe.created_at} */}
              </p>
              <p>
                Statut :
                {' '}
                {equipe.statut}
              </p>
              <p>
                Entraineur:
                {' '}
                {token.prenom}
                {' '}
                {token.nom}
              </p>
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
              {
            equipe.joueurs.map((joueur) => (
              <Link key={joueur.id} to="/equipes/senior/joueur" className="row">
                <div className="cell">
                  {joueur.nom}
                  {' '}
                  {joueur.prenom}
                  <div className="table__email">{joueur.email}</div>
                </div>
                <div className="cell owner">
                  .
                  {' '}
                  {equipe.categories.nom}
                </div>
                <div className="cell">{`${functionConverteDate.convertDateToDelay(joueur.derniere_activite)} min ago`}</div>
              </Link>
            ))
          }
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
