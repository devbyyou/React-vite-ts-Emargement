/* eslint-disable max-len */
import React from 'react';
import './index.scss';
import cn from 'classnames';
import { useAppSelector } from '../../../../hooks/redux';
import functionConverteDate from '../../Home/MembersList/ConverteDate';

function ListPresents() {
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const findAllSeances = equipes.map((seances) => seances.seances);
  const findAllJoueurs = equipes.map((seances) => seances.joueurs);

  const findAllPresences = findAllSeances.map((seances) => seances.map((findpresences) => {
    const presence = findpresences.presences;
    return presence.filter((present) => present);
  }));
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

  return (
    <div className="listPresents">

      <div className="listPresents__timer">Début du prochaine entrainement dans : 3:05 min</div>
      <div className="listPresents__table">

        <select className="teamSelect" name="teamSelect" id="teamSelect">
          <option value="">Choisi ton équipe</option>
          <option value="cdm">CDM</option>
          <option value="senior">Sénior</option>
          <option value="u20">U20</option>
        </select>

        <div className="listPresents__row listPresents__label">
          <div className="listPresents__cell">Nom</div>
          <div className="listPresents__cell">Séance Prévu à</div>
          <div className="listPresents__cell">Vu à</div>
          <div className="listPresents__cell">Présent</div>
          <div className="listPresents__cell">Absent</div>
          <div className="listPresents__cell">Retard</div>
        </div>

        {findAllPresences.map((sessions, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {sessions.map((players) => players.map((player) => (
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
                  {functionConverteDate.heureHiver(player.updated_at, 1, 'HH:mm:ss')}
                </div>
                <div className="listPresents__cell">
                  {player.statut}
                </div>
                <div className="listPresents__cell">{player.absence}</div>
                <div className="listPresents__cell">{player.retard}</div>

              </div>
            )))}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
}
export default ListPresents;
