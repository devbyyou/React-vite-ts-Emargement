import React, { ChangeEvent, FormEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
// import { useAppSelector } from '../../../../../hooks/redux';

interface IinputSetState {
  inputSetState: React.Dispatch<React.SetStateAction<string>>;
  inputState:string
}

function FormSearchMembers({ inputState, inputSetState }: IinputSetState) {
  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    inputSetState(inputValue);
  }

  function handleSubmitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmitForm} className="search-bar">
      <CiSearch className="logo__search_members" />
      <input
        type="text"
        placeholder="Rechercher par nom"
        onChange={handleOnChange}
        value={inputState}
      />
    </form>
  );
}

export default FormSearchMembers;
