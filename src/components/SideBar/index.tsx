import React from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { PiUsersThreeLight } from 'react-icons/pi';
import { LuClipboardSignature } from 'react-icons/lu';
import { AiOutlineSetting } from 'react-icons/ai';
import cn from 'classnames';
import logo from '../../assets/devbyyou.png';

interface NavLinkParams {
  isActive: boolean;
}

function SideBar() {
  const classNameLink = ({ isActive }: NavLinkParams) => cn('icons', {
    'menu-link--active': isActive,
  });

  return (
    <nav className="sidebar">
      <img className="logo" src={logo} alt="logo" />
      <NavLink className={classNameLink} to="/">
        <GoHome />
        Home
      </NavLink>
      <NavLink className={classNameLink} to="/equipes">
        <PiUsersThreeLight />
        Equipes
      </NavLink>
      <NavLink className={classNameLink} to="/presents">
        <LuClipboardSignature />
        Presents
      </NavLink>
      <NavLink className={classNameLink} to="/parametre">
        <AiOutlineSetting />
        Paramètre

      </NavLink>
      <NavLink className={classNameLink} to="/pageJoueur">
        <GoHome />
        Page Joueur

      </NavLink>
      <NavLink className={classNameLink} to="/inscription">
        <GoHome />
        Inscription

      </NavLink>
    </nav>
  );
}

export default SideBar;
