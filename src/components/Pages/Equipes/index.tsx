import React, { ChangeEvent, FormEvent, useState } from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { GrFormAdd } from 'react-icons/gr';
import { AiOutlineSearch } from 'react-icons/ai';
import Filter from './Filter';
import Cards from './Cards';
import { useAppSelector } from '../../../hooks/redux';

function Equipes() {
  const [stateInputValue, setInputValue] = useState('');
  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;
  const [filteredByCheckbox, setfilteredByCheckbox] = useState();

  function handleChangeForm(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  }
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Filtrer les équipes en fonction de la barre de recherche
    const filteredBySearch = equipes.filter((equipe) => (
      equipe.nom.toLowerCase().includes(stateInputValue.toLowerCase())
    ));

    // Combiner le filtre par checkbox avec le filtre par recherche
    const combinedFilter = filteredByCheckbox.length > 0
      // eslint-disable-next-line max-len
      ? filteredByCheckbox.filter((equipe) => filteredBySearch.some((filteredEquipe) => equipe.id === filteredEquipe.id))
      : filteredBySearch;

    setfilteredByCheckbox(combinedFilter);
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
        <Filter
          filteredByCheckbox={filteredByCheckbox}
          setfilteredByCheckbox={setfilteredByCheckbox}
        />
        <Cards filteredByCheckbox={filteredByCheckbox} stateInputValue={stateInputValue} />
      </div>
    </div>
  );
}

export default Equipes;
