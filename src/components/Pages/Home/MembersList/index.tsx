import React, { useState } from 'react';
import './index.scss';
// import { CiSearch } from 'react-icons/ci';
import { BiSolidChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';
import FormSearchMembers from './FormSearchMembers';
import functionConverteDate from './ConverteDate';

function MembersList() {
  const [inputState, inputSetState] = useState<string>('');

  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;

  const listEquipes = equipes.map((listJoueurs) => listJoueurs);

  return (
    <div className="members-list">

      <div className="header">
        <h2 className="titleMembre">Membres</h2>
      </div>
      <FormSearchMembers inputState={inputState} inputSetState={inputSetState} />

      {/* Début Tableau */}
      <div className="table tablenoScrool">
        <div className="row label noScrool">
          <div className="cell">Nom</div>
          <div className="cell">Catégories</div>
          <div className="cell">Dernière Activité</div>
        </div>

        {
  listEquipes.map((listeJoueurs) => {
    const categories = listeJoueurs.categories.nom;
    const { joueurs } = listeJoueurs;
    // eslint-disable-next-line max-len
    const filterdJoueur = joueurs.filter((joueur) => joueur.nom.toLowerCase().includes(inputState.toLowerCase()));
    // console.log(filterdJoueur);

    return filterdJoueur.map((joueur) => (
      <div key={joueur.id} className="row">
        <div className="cell cellNoscroll">
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
        <div className="cell">{`${functionConverteDate.convertDateToDelay(joueur.derniere_activite)} min ago`}</div>
      </div>
    ));
  })
}
        {/* Fin tableau liste joueur */}
      </div>
      {/* Fin Tableau */}
      <button type="button" className="add-button">
        <BiSolidChevronRight className="members-list__logo" />
        <Link to="/equipes">
          Voir plus
        </Link>
      </button>
    </div>
  );
}

export default MembersList;
