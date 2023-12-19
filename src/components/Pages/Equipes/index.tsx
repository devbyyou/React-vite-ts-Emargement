import React, {
  ChangeEvent, FormEvent, useState,
} from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { GrFormAdd } from 'react-icons/gr';
import { AiOutlineSearch } from 'react-icons/ai';
import cn from 'classnames';
import Filter from './Filter';
import Cards from './Cards';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Equipe } from '../../../@types/user';
import NewTeam from './NewTeam';
import {
  toggleIsOpen,
} from '../../../store/reducers/equipes';

function Equipes() {
  const [stateInputValue, setInputValue] = useState('');
  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;
  const [filteredByCheckbox, setfilteredByCheckbox] = useState<Equipe[]>(equipes);
  const [activeNumber, setActiveNumber] = useState<Equipe[]>([]);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.equipes.isOpen);

  function handleChangeForm(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  }
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  function handleClickToggle() {
    // J'emet mon intention / action
    dispatch(toggleIsOpen());
  }
  const openClassNames = cn('newteam__content', {
    'newteam__content--closed': !isOpen,
  });
  return (
    <div className="content__equipe">
      <header className="content__equipe-header">
        <div className="content__equipe-tl">
          <RiTeamLine className="content__equipe-tlogo" />
          <h1 className="content__equipe-title">Equipes</h1>
        </div>
        <button onClick={handleClickToggle} type="button" className="content__equipe-button">
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
        <Filter
          setActiveNumber={setActiveNumber}
          setfilteredByCheckbox={setfilteredByCheckbox}
          activeNumber={activeNumber}
        />
        <Cards
          activeNumber={activeNumber.length > 0 ? activeNumber : null}
          filteredByCheckbox={filteredByCheckbox}
          filteredByCategory={filteredByCheckbox.length > 0 ? filteredByCheckbox : null}
          stateInputValue={stateInputValue}
        />
      </div>
      <NewTeam openClassNames={openClassNames} />
    </div>
  );
}

export default Equipes;
