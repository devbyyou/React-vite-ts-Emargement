import React from 'react';
import './index.scss';
import Overview from './Overview';
import ListChoice from './ListChoice';
import MembersList from './MembersList';
import Graph from './Graph';
import Header from './Header';
import { useAppSelector } from '../../../hooks/redux';

function Home() {
  const token = useAppSelector((state) => state.user.token);
  // console.log(token);

  return (
    <div>
      <Header />
      <div className="messageHome">
        { `
        Bienvenue à nouveau, 
        ${token.user.prenom}`}
        👋
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
