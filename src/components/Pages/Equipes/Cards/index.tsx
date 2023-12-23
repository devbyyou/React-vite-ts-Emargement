/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { CgMoreVerticalO } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/devbyou.png';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { Equipe } from '../../../../@types/user';
import { fetchEquipesForUser } from '../../../../store/reducers/equipes';

interface IstateInputValue {
  stateInputValue:string
  filteredByCheckbox:Equipe[]
  filteredByCategory:Equipe[] | null
  activeNumber : Equipe[] | null
}
function Cards({
  stateInputValue, filteredByCheckbox, filteredByCategory, activeNumber,
}:IstateInputValue) {
  // const user = useAppSelector((state) => state.user.token.user);
  // const { equipes } = user;
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const filteredTeams = filteredByCategory || activeNumber || equipes.filter((equipe) => (
    equipe.nom.toLowerCase()
      .includes(stateInputValue.toLowerCase())
    || equipe.categories.nom.toLowerCase()
      .includes(stateInputValue.toLowerCase())
  ));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEquipesForUser());
  }, [dispatch]);

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
    <Link key={listesEquipes.id} to={`/equipes/${listesEquipes.categories.nom}`} className="cards__containers-card">
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
