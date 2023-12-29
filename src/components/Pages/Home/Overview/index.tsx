import React, { useEffect } from 'react';
import './style.scss';
import { BiFootball } from 'react-icons/bi';
// import List from './List';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { fetchEquipesForUser } from '../../../../store/reducers/equipes';

function Overview() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEquipesForUser());
  }, [dispatch]);

  const equipes = useAppSelector((state) => state.equipes.equipes);
  const nbEquipes = equipes.length;

  const nbJoueursParEquipe = equipes.map((listeJoueurs) => listeJoueurs.joueurs.length);
  // eslint-disable-next-line no-return-assign, no-param-reassign
  const totalJoueurs = nbJoueursParEquipe.reduce((nbA, nbB) => nbA += nbB, 0);

  return (
    <div className="overviews">
      {/* <div className="overview"> */}
      <div className="card">
        <p className="card__title">
          <BiFootball className="card__icons" />
          Equipe
        </p>
        <p className="card__number">{nbEquipes}</p>
      </div>
      {/* </div> */}
      {/* <div className="overview"> */}
      <div className="card">
        <p className="card__title">
          <BiFootball className="card__icons" />
          Joueur
        </p>
        <p className="card__number">{totalJoueurs}</p>
      </div>
      {/* </div>  */}
      {/* <div className="overview"> */}
      <div className="card">
        <p className="card__title">
          <BiFootball className="card__icons" />
          Categorie
        </p>
        <p className="card__number">{totalJoueurs}</p>
      </div>
      {/* </div> */}
      {/* <div className="overview">
        <div className="card">
          <p className="card__title">
            <BiFootball className="card__icons" />
            Coaches
          </p>
          <p className="card__number">{totalJoueurs}</p>
        </div>
      </div> */}
    </div>
  );
}

export default Overview;
