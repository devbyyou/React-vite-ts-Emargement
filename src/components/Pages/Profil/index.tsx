/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';

function Profil() {
  const user = useAppSelector((state) => state.coaches.user);
  const {
    prenom,
    nom,
    banniere,
    logo,
    created_at,
    last_activity,
  } = user;

  return (
    <div className="profil__content">
      <div className="profil__banniere">
        <img className="profil__banniere-img" src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blta5430aa84eaf12ac/60dc1336d9a5243b669e0a4e/908c03edb3472af2dd58ae3fee29c9569c5aefb2.jpg?auto=webp&format=pjpg&width=1080&quality=60" alt="" />
        <div className="profil__banniere-dec">
          <div className="profil__banniere-dec-name-pic">
            <img className="profil__banniere-logo" src="https://previews.123rf.com/images/sevalv/sevalv1801/sevalv180101462/94340988-joli-mec-barbu-avec-un-sourire-brillant-et-joyeux-regardant-la-cam%C3%A9ra-tout-en-se-tenant-sur-un-fond.jpg" alt="" />
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
