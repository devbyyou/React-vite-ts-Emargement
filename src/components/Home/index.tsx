import React from 'react';
// import { Link } from 'react-router-dom';
import './index.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import Notification from './Notification';

function Home() {
  return (
    <div className="content__page--home">
      <form action="submit" className="form">
        <AiOutlineSearch className="logo__search" />
        <input placeholder="Recherche" className="form__input" type="text" />
      </form>
      <Notification />
    </div>
  );
}

export default Home;
