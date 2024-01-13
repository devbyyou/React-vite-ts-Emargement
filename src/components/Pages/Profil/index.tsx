/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';

function Profil() {
  const token = useAppSelector((state) => state.user.token);
  const { joueur, user } = token;
  // console.log(joueur);
  // console.log(user);

  const userCoache = useAppSelector((state) => state.coaches.user);
  const {
    prenom,
    nom,
    banniere,
    logo,
    created_at,
    last_activity,
  } = userCoache;
  // console.log(prenom);

  return (
    <div className="profil__content">
      <div className="profil__banniere">
        <img className="profil__banniere-img" src={banniere} alt="" />
        <div className="profil__banniere-dec">
          <div className="profil__banniere-dec-name-pic">
            <img className="profil__banniere-logo" src={logo} alt="" />
            <p>
              {user ? prenom : joueur.prenom}
              {' '}
              {user ? nom : joueur.nom}
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
          {functionConverteDate.chronoTime(user ? created_at : joueur.created_at)}
        </p>
        <p>
          Derniere activité le
          {' '}
          {functionConverteDate.calendaraDate(user ? last_activity : joueur.derniere_activite)}

        </p>
      </div>
    </div>
  );
}

export default Profil;
