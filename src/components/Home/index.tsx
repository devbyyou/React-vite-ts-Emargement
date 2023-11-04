import React from 'react';
// import { Link } from 'react-router-dom';
import './index.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import Notification from './Notification';
import Overview from './Overview';
import ListChoice from './ListChoice';

function Home() {
  return (
    <div>
      <header className="header__page--home">
        <form action="submit" className="form">
          <AiOutlineSearch className="logo__search" />
          <input placeholder="Recherche" className="form__input" type="text" />
        </form>
        <Notification />
      </header>
      <div className="messageHome">
        Bienvenue à nouveau, Robert 👋
      </div>
      <h2 className="title">Overview</h2>

      <div className="content__displayChoice">
        <Overview />
        <ListChoice />
      </div>
    </div>
  );
}

export default Home;
