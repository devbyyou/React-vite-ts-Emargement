import React from 'react';
import './style.scss';
// import { IoMdNotificationsOutline } from 'react-icons/io';
import { HiMiniChevronUpDown } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux';

function Notification() {
  const token = useAppSelector((state) => state.user.token.user);
  const {
    nom, prenom, id, logo,
  } = token;
  return (
    <Link to="/profil" className="content__notification">
      {/* <IoMdNotificationsOutline className="notif" /> */}
      {/* 2 */}
      <div className="pics">
        <img
          src="https://previews.123rf.com/images/sevalv/sevalv1801/sevalv180101462/94340988-joli-mec-barbu-avec-un-sourire-brillant-et-joyeux-regardant-la-cam%C3%A9ra-tout-en-se-tenant-sur-un-fond.jpg"
          alt="profile"
        />
      </div>
      <div className="name-id">
        <p className="name">
          {`
        ${prenom}
        ${nom}
        `}

        </p>
        <p className="id">
          {`#
        ${id}
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
