import React, { useEffect } from 'react';
import './index.scss';
import { CiSearch } from 'react-icons/ci';
import { BiSolidChevronRight } from 'react-icons/bi';
import moment from 'moment';
import { useAppSelector } from '../../../../hooks/redux';

function MembersList() {
  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;

  const listEquipes = equipes.map((listJoueurs) => listJoueurs);
  // eslint-disable-next-line max-len

  function convertDate(derniere_activite: string | number): React.ReactNode {
    const lastActivity = moment(derniere_activite);
    const now = moment();

    const minutesElapsed = now.diff(lastActivity, 'minutes');
    return minutesElapsed;
  }

  return (
    <div className="members-list">

      <div className="header">
        <h2 className="titleMembre">Membres</h2>
      </div>
      <div className="search-bar">
        <CiSearch className="logo__search_members" />
        <input type="text" placeholder="Rechercher par nom" />
      </div>

      {/* Début Tableau */}
      <div className="table">
        <div className="row label">
          <div className="cell">Nom</div>
          <div className="cell">Catégories</div>
          <div className="cell">Dernière Activité</div>
        </div>

        {
  listEquipes.map((listeJoueurs) => {
    const categories = listeJoueurs.categories.nom;
    const { joueurs } = listeJoueurs;
    return joueurs.map((joueur) => (
      <div key={joueur.id} className="row">
        <div className="cell">
          {`
          ${joueur.nom}
          ${joueur.prenom}
          `}
          <div className="table__email">{joueur.email}</div>
        </div>
        <div className="cell owner">
          .
          {categories}
        </div>
        <div className="cell">{`${convertDate(joueur.derniere_activite)} min ago`}</div>
      </div>
    ));
  })
}
        {/* Fin tableau liste joueur */}
      </div>
      {/* Fin Tableau */}
      <button type="button" className="add-button">
        <BiSolidChevronRight className="members-list__logo" />
        Voir plus
      </button>
    </div>
  );
}

export default MembersList;
