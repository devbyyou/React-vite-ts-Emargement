/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useState } from 'react';
import './index.scss';
import cn from 'classnames';
import { useAppSelector } from '../../../../hooks/redux';
import functionConverteDate from '../../Home/MembersList/ConverteDate';
import { Seances } from '../../../../@types/user';

interface IDate {
  selectedDate: any
  setStatefilteredByEquipe : React.Dispatch<React.SetStateAction<any>>
  statefilteredByEquipe:Seances[]

}
function ListPresents({ selectedDate, setStatefilteredByEquipe, statefilteredByEquipe }:IDate) {
  const [valueOption, setvalueOption] = useState('');
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const findAllSeances = equipes.map((seances) => seances.seances);
  const findAllJoueurs = equipes.map((seances) => seances.joueurs);
  const findSeances = (seanceId: number) => {
    const filteredHeures = findAllSeances
      .flatMap((seance) => seance
        .filter((seances) => seances.id === seanceId))
      .map((seance) => seance.heure);

    return filteredHeures.length > 0 ? filteredHeures.join(', ') : 'No matching seances found';
  };
  const findPlayer = (playerId: number) => {
    const filteredPlayer = findAllJoueurs
      .flatMap((joueur) => joueur
        .filter((joueurs) => joueurs.id === playerId))
      .map((joueur) => `${joueur.prenom} ${joueur.nom}`);
    return filteredPlayer.length > 0 ? filteredPlayer.join(', ') : 'No matching seances found';
  };
  const findPlayerTel = (playerId: number) => {
    const filteredPlayer = findAllJoueurs
      .flatMap((joueur) => joueur
        .filter((joueurs) => joueurs.id === playerId))
      .map((joueur) => joueur.tel);
    return filteredPlayer.length > 0 ? filteredPlayer.join(', ') : 'No matching seances found';
  };
  const filteredByEquipe = findAllSeances
    .flatMap((seances) => seances
      .filter((seance) => seance.equipe_id.toString() === valueOption.toString()
      && functionConverteDate.calendaraDate(seance.horaire) === functionConverteDate.calendaraDate(selectedDate)));
  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const valueSelect = event.target.value;
    setvalueOption(valueSelect);
  };
  // useEffect(() => {
  //   if (filteredByEquipe.length > 0) {
  //     setStatefilteredByEquipe(filteredByEquipe);
  //   }
  // },[filteredByEquipe]);
  useEffect(() => {
    // Ajouter une condition pour comparer l'état actuel avec le nouvel état
    if (JSON.stringify(filteredByEquipe) !== JSON.stringify(statefilteredByEquipe)) {
      setStatefilteredByEquipe(filteredByEquipe);
    }
  }, [filteredByEquipe, setStatefilteredByEquipe, statefilteredByEquipe]);

  return (
    <div className="listPresents">
      <div className="listPresents__table">
        <select onChange={handleChangeOption} value={valueOption} className="teamSelect" name="teamSelect" id="teamSelect">
          <option value="">Choisi ton équipe</option>
          { equipes.map((equipe) => (
            <option
              value={equipe.id}
              key={equipe.id}
            >
              {`${equipe.nom} - ${equipe.categories.nom} `}
            </option>
          ))}
        </select>
        <div className="listPresents__row listPresents__label">
          <div className="listPresents__cell">Nom</div>
          <div className="listPresents__cell">Séance Prévu à</div>
          <div className="listPresents__cell">Vu à</div>
          <div className="listPresents__cell">Présent</div>
          <div className="listPresents__cell">Absent</div>
          <div className="listPresents__cell">Retard</div>
        </div>
        {filteredByEquipe.map((seances) => seances.presences.map((player) => (
          <div
            key={player.id}
            className={cn('listPresents__row', {
              present: player.statut === 'PRESENT',
              retard: player.retard === 'RETARD',
              absent: player.absence === 'ABSENT',
            })}
          >
            <div className="listPresents__cell">
              {findPlayer(player.joueur_id)}
              <div className="listPresents__table__email">{findPlayerTel(player.joueur_id)}</div>
            </div>
            <div className="listPresents__cell">
              { findSeances(player.seance_id)}
            </div>
            <div className="listPresents__cell">
              {functionConverteDate.heureHiver(player.updated_at, 1, 'HH:mm')}
            </div>
            <div className="listPresents__cell">
              {player.statut}
            </div>
            <div className="listPresents__cell">{player.absence}</div>
            <div className="listPresents__cell">{player.retard}</div>

          </div>
        )))}
      </div>
    </div>
  );
}
export default ListPresents;
