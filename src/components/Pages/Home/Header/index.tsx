import React from 'react';
import './index.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import Notification from '../Notification';

function Header() {
  return (
    <header className="header__page--home">
      <form action="submit" className="form">
        <AiOutlineSearch className="logo__search" />
        <input placeholder="Recherche" className="form__input" type="text" />
      </form>
      <Notification />
    </header>
  );
}

export default Header;
