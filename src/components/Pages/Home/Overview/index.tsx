import React from 'react';
import './style.scss';
import { BiFootball } from 'react-icons/bi';
import List from './List';
import { useAppSelector } from '../../../../hooks/redux';

function Overview() {
  const nbEquipes = useAppSelector((state) => state.user.token.user);
  // console.log(nbEquipes);
  const nbTotalEquipes = nbEquipes.equipes.length;
  const nbTotalJoueurs = nbEquipes.equipes;

  nbTotalJoueurs.map((joueur) => (
    console.log(joueur.joueurs.length)
  ));

  return (
    <div className="overviews">
      <div className="overview">
        <div className="card">
          <p className="card__title">
            <BiFootball className="card__icons" />
            Equipe
          </p>
          <p className="card__number">{nbTotalEquipes}</p>
        </div>
      </div>
      <div className="overview">
        <div className="card">
          <p className="card__title">
            <BiFootball className="card__icons" />
            Joueur
          </p>
          <p className="card__number">14</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
