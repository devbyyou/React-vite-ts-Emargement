import React from 'react';
// import './index.scss';
import { BiFootball } from 'react-icons/bi';

function List() {
  return (
    <div className="overview">
      <div className="card">
        <p className="card__title">
          <BiFootball className="card__icons" />
          Equipe
        </p>
        <p className="card__number">1</p>
      </div>
    </div>
  );
}

export default List;
