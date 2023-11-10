import React from 'react';
// import { Link } from 'react-router-dom';
import './index.scss';

import Overview from './Overview';
import ListChoice from './ListChoice';
import MembersList from './MembersList';
import Graph from './Graph';
import Header from './Header';

function Home() {
  return (
    <div>
      <Header />
      <div className="messageHome">
        Bienvenue à nouveau, Robert 👋
      </div>
      <h2 className="title">Overview</h2>

      <div className="content__displayChoice">
        <Overview />
        <ListChoice />
      </div>
      <MembersList />
      <h3 className="title__graph">Pourcentage de fréquentation (par jour) </h3>
      <Graph />
    </div>
  );
}

export default Home;
