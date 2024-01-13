import React from 'react';
import './style.scss';
// import { IoMdNotificationsOutline } from 'react-icons/io';
import { HiMiniChevronUpDown } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';

function Notification() {
  const userCoaches = useAppSelector((state) => state.coaches.user);
  const token = useAppSelector((state) => state.user.token);
  const { joueur, user } = token;
  const {
    nom, prenom, id, logo,
  } = userCoaches;

  return (
    <Link to="/profil" className="content__notification">
      {/* <IoMdNotificationsOutline className="notif" /> */}
      {/* 2 */}
      <div className="pics">
        <img
          src={logo}
          alt="profile"
        />
      </div>
      <div className="name-id">
        <p className="name">
          {`
        ${user ? prenom : joueur.prenom}
        ${user ? nom : joueur.nom}
        `}

        </p>
        <p className="id">
          {`#
        ${user ? id : joueur.id}
        `}
        </p>
      </div>

      <div className="icone-profile">
        <HiMiniChevronUpDown />
      </div>
    </Link>
  );
}

export default Notification;
