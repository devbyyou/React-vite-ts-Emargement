import React from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { GrFormAdd } from 'react-icons/gr';

function Equipes() {
  return (
    <div className="content__equipe">
      <header className="content__equipe-header">
        <div className="content__equipe-tl">
          <RiTeamLine className="content__equipe-tlogo" />
          <h1 className="content__equipe-title">Equipes</h1>
        </div>
        <button type="button" className="content__equipe-button">
          <GrFormAdd className="content__equipe-alogo" />
          <div className="content__equipe-text"> Nouvelle équipe</div>
        </button>
      </header>
      <form className="content__equipe-form" action="submit">

        <input placeholder="trouve ton équipe" className="content__equipe-input" type="text" />
      </form>
    </div>
  );
}

export default Equipes;
