import React from 'react';
import './index.scss';
import { useAppSelector } from '../../../../hooks/redux';

function ListPresents() {
  const equipes = useAppSelector((state) => state.equipes.equipes);

  // const = equipes;
  // console.log(seances);

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
          <div className="listPresents__cell">Vu à</div>
          <div className="listPresents__cell">Présent</div>
          <div className="listPresents__cell">Absent</div>
          <div className="listPresents__cell">En retard</div>
        </div>

        <div className="listPresents__row present">
          <div className="listPresents__cell">
            John Doe
            <div className="listPresents__table__email">066666666</div>
          </div>
          <div className="listPresents__cell ">18:00</div>
          <div className="listPresents__cell">PRESENT</div>
          <div className="listPresents__cell">_</div>
          <div className="listPresents__cell">_</div>
        </div>

        <div className="listPresents__row retard">
          <div className="listPresents__cell">
            John Doe
            <div className="listPresents__table__email">066666666</div>
          </div>
          <div className="listPresents__cell ">18:10</div>
          <div className="listPresents__cell">_</div>
          <div className="listPresents__cell">_</div>
          <div className="listPresents__cell">RETARD</div>
        </div>

        <div className="listPresents__row absent">
          <div className="listPresents__cell">
            John Doe
            <div className="listPresents__table__email">066666666</div>
          </div>
          <div className="listPresents__cell ">_</div>
          <div className="listPresents__cell">_</div>
          <div className="listPresents__cell">ABSENT</div>
          <div className="listPresents__cell">_</div>
        </div>

      </div>
    </div>
  );
}
export default ListPresents;
