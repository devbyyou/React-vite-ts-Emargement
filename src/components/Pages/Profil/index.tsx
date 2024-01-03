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
        <img className="profil__banniere-img" src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blta5430aa84eaf12ac/60dc1336d9a5243b669e0a4e/908c03edb3472af2dd58ae3fee29c9569c5aefb2.jpg?auto=webp&format=pjpg&width=1080&quality=60" alt="" />
        <div className="profil__banniere-dec">
          <div className="profil__banniere-dec-name-pic">
            <img className="profil__banniere-logo" src="https://previews.123rf.com/images/sevalv/sevalv1801/sevalv180101462/94340988-joli-mec-barbu-avec-un-sourire-brillant-et-joyeux-regardant-la-cam%C3%A9ra-tout-en-se-tenant-sur-un-fond.jpg" alt="" />
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
