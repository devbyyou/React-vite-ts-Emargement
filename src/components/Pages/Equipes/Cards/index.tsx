/* eslint-disable no-nested-ternary */
import React from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { CgMoreVerticalO } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/devbyou.png';
import { useAppSelector } from '../../../../hooks/redux';
import { Equipe } from '../../../../@types/user';

interface IstateInputValue {
  stateInputValue:string
  filteredByCheckbox:Equipe[]
  filteredByCategory:Equipe[] | null
}
function Cards({ stateInputValue, filteredByCheckbox, filteredByCategory }:IstateInputValue) {
  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;
  const filteredTeams = filteredByCategory || equipes.filter((equipe) => (
    equipe.nom.toLowerCase()
      .includes(stateInputValue.toLowerCase())
       || equipe.categories.nom.toLowerCase()
         .includes(stateInputValue.toLowerCase())
  ));
  // console.log(filteredByCheckbox);

  return (
    <div className="content__equipe__contenu-card">
      <p>
        {`${filteredByCheckbox.length || filteredTeams.length}`}
        {' '}
        {`${(filteredByCheckbox.length <= 1 ? 'résultat' : 'résultats') && (filteredTeams.length <= 1 ? 'résultat' : 'résultats')}`}

      </p>
      <div className="cards__containers">
        {
 (
    filteredTeams.map((listesEquipes) => (
      <Link key={listesEquipes.id} to="/equipes/senior" className="cards__containers-card">
        <div className="cards__containers-logo-name-logo">
          <div className="cards__containers-logo-name">
            <img className="cards__containers-logo" src={logo} alt="" />
            <div className="name">
              {listesEquipes.categories.nom}
              {' - '}
              {listesEquipes.nom}
            </div>
          </div>
          <CgMoreVerticalO className="logoMore" />
        </div>
        <div className="info">
          <RiTeamLine />
          <div className="count">{listesEquipes.joueurs.length}</div>
        </div>
      </Link>
    ))
)
        }
      </div>
    </div>
  );
}

export default Cards;
