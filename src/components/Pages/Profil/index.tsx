import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';

function Profil() {
  const user = useAppSelector((state) => state.user.token.user);
  const {
    prenom,
    nom,
    banniere,
    logo,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    created_at,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    last_activity,
  } = user;

  return (
    <div className="profil__content">
      <div className="profil__banniere">
        <img className="profil__banniere-img" src={banniere} alt="" />
        <div className="profil__banniere-dec">
          <div className="profil__banniere-dec-name-pic">
            <img className="profil__banniere-logo" src={logo} alt="" />
            <p>
              {prenom}
              {' '}
              {nom}
            </p>
          </div>

          <div className="profil__banniere-dec-btn">
            <Link to="/parametre">
              <button type="button">Modifier mon profil</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="profil__informations">
        <h3>Informations</h3>
        <p>
          Inscrit le
          {' '}
          {functionConverteDate.chronoTime(created_at)}
        </p>
        <p>
          Derniere activité le
          {' '}
          {functionConverteDate.calendaraDate(last_activity)}

        </p>
      </div>
    </div>
  );
}

export default Profil;
