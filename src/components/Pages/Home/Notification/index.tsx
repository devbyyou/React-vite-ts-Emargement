import React from 'react';
import './style.scss';
// import { IoMdNotificationsOutline } from 'react-icons/io';
import { HiMiniChevronUpDown } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

function Notification() {
  return (
    <Link to="/profil" className="content__notification">
      {/* <IoMdNotificationsOutline className="notif" /> */}
      {/* 2 */}
      <div className="pics">
        <img
          src="https://miro.medium.com/v2/resize:fill:96:96/1*yWfoK01BZFKO6fFQyzxJSA.jpeg"
          alt="profile"
        />
      </div>
      <div className="name-id">
        <p className="name">Robert Fox</p>
        <p className="id">#12334</p>
      </div>

      <div className="icone-profile">
        <HiMiniChevronUpDown />
      </div>
    </Link>
  );
}

export default Notification;
