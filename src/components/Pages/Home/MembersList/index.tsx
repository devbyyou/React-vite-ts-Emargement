import React from 'react';
import './index.scss';
import { CiSearch } from 'react-icons/ci';
import { BiSolidChevronRight } from 'react-icons/bi';

function MembersList() {
  return (
    <div className="members-list">
      <div className="header">
        <h2 className="titleMembre">Membres</h2>

      </div>

      <div className="search-bar">
        <CiSearch className="logo__search_members" />
        <input type="text" placeholder="Rechercher par nom" />
      </div>
      <div className="table">
        <div className="row label">
          <div className="cell">Nom</div>
          <div className="cell">Catégories</div>
          <div className="cell">Dernière Activité</div>
        </div>
        <div className="row">
          <div className="cell">
            John Doe
            <div className="table__email">letsgo@gmail.com</div>
          </div>
          <div className="cell owner">. Sénior</div>
          <div className="cell">2 m ago</div>
        </div>
        <div className="row">
          <div className="cell">
            Jane Smith
            <div className="table__email">letsgo@gmail.com</div>
          </div>
          <div className="cell admin">. U20</div>
          <div className="cell">1 h ago</div>
        </div>
        <div className="row">
          <div className="cell">
            Pascal Kane
            {' '}
            <div className="table__email">letsgo@gmail.com</div>
          </div>
          <div className="cell admin">. U20</div>
          <div className="cell">30 m ago</div>
        </div>
      </div>
      <button type="button" className="add-button">
        <BiSolidChevronRight className="members-list__logo" />
        Voir plus
      </button>
    </div>
  );
}

export default MembersList;
