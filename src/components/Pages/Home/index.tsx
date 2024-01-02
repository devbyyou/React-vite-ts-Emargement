/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import './index.scss';
import Overview from './Overview';
import ListChoice from './ListChoice';
import MembersList from './MembersList';
import Graph from './Graph';
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchEquipesForUser } from '../../../store/reducers/equipes';
import { fetchCoaches } from '../../../store/reducers/coaches';

function Home() {
  const user = useAppSelector((state) => state.coaches.user);
  const { prenom } = user;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEquipesForUser());
    dispatch(fetchCoaches());
  }, [dispatch]);

  return (
    <>
      <div className="messageHome">
        { `
        Bienvenue à nouveau, 
        ${prenom}`}
        {' '}
        👋
      </div>
      <Header />
      <h2 className="title">Vue d'ensemble</h2>

      <div className="content__displayChoice">
        <Overview />
      </div>
      <div className="homeDisplayAcces">

        <MembersList />
        <ListChoice />
      </div>
      <h3 className="title__graph">Pourcentage de fréquentation (par jour) </h3>
      <Graph />
    </>
  );
}

export default Home;
