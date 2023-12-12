import React, { ChangeEvent, FormEvent, useState } from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { GrFormAdd } from 'react-icons/gr';
import { AiOutlineSearch } from 'react-icons/ai';
import Filter from './Filter';
import Cards from './Cards';

function Equipes() {
  const [stateInputValue, setInputValue] = useState('');

  function handleChangeForm(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  }
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
      {/* Début Formulaire */}
      <form onSubmit={handleFormSubmit} className="content__equipe-form" action="submit">
        <input value={stateInputValue} onChange={handleChangeForm} placeholder="Trouve ton équipe" className="content__equipe-input" type="text" />
        <AiOutlineSearch className="content__equipe-form-logo" />
      </form>
      {/* Fin Formulaire */}
      <div className="content__equipe__contenu">
        <Filter />
        <Cards stateInputValue={stateInputValue} />
      </div>
    </div>
  );
}

export default Equipes;
