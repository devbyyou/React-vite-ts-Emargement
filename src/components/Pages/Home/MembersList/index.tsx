import React, { useEffect, useState } from 'react';
import './index.scss';
// import { CiSearch } from 'react-icons/ci';
import { BiSolidChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import FormSearchMembers from './FormSearchMembers';
import functionConverteDate from './ConverteDate';
import { fetchEquipesForUser } from '../../../../store/reducers/equipes';

function MembersList() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEquipesForUser());
  }, [dispatch]);
  const [inputState, inputSetState] = useState<string>('');
  const equipes = useAppSelector((state) => state.equipes.equipes);

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
      <Link to="/equipes">
        <button type="button" className="add-button">
          <BiSolidChevronRight className="members-list__logo" />
          Voir plus
        </button>
      </Link>
    </div>
  );
}

export default MembersList;
