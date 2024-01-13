import React from 'react';
import './index.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import cn from 'classnames';
import Notification from '../Notification';
import { useAppSelector } from '../../../../hooks/redux';

function Header() {
  const token = useAppSelector((state) => state.user.token);
  const { joueur } = token;
  const openClassNames = cn('header__page--home', {
    backgroundHeader: joueur,
  });
  return (
    <header className={openClassNames}>
      <form action="submit" className="form">
        <AiOutlineSearch className="logo__search" />
        <input placeholder="Recherche" className="form__input" type="text" />
      </form>
      <Notification />
    </header>
  );
}

export default Header;
