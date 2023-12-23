import React, {
  ChangeEvent, FormEvent, KeyboardEvent, useEffect,
} from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  changeCredentialsField, createEquipe, fetchEquipesForUser, toggleIsOpen,
} from '../../../../store/reducers/equipes';
import { findAllCategories } from '../../../../store/reducers/categories';
// import { Equipe } from '../../../../@types/user';

interface IopenClassNames {
  openClassNames:string,
}

function NewTeam({ openClassNames } :IopenClassNames) {
  const nom = useAppSelector((state) => state.equipes.credentials.nom);
  const categories = useAppSelector((state) => state.categories.categories);
  const logo = useAppSelector((state) => state.equipes.credentials.logo);
  const statut = useAppSelector((state) => state.equipes.credentials.statut);
  // const categorieId = useAppSelector((state) => state.equipes.credentials.categorieId);
  // const equipes = useAppSelector((state) => state.user.statut);
  // const team = useAppSelector((state) => state.equipes.equipes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEquipesForUser());
    dispatch(findAllCategories());
  }, [dispatch]);
  function handleClickedClose() {
    dispatch(toggleIsOpen());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Esc') {
      dispatch(toggleIsOpen());
    }
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await dispatch(createEquipe());
    await dispatch(fetchEquipesForUser());
    dispatch(toggleIsOpen());
  }

  const handleChangeInput = (field: 'nom' | 'categorieId' | 'logo' | 'statut') => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(changeCredentialsField({
      value,
      field,
    }));
  };

  // useEffect(() => {
  //   dispatch(findAllCategories());
  // }, [dispatch]);
  // console.log(categories);
  return (
    <div className={openClassNames}>
      <div onClick={handleClickedClose} onKeyDown={handleKeyDown} role="button" tabIndex={0} className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
          ×
        </button>
      </div>

      <div className="newteam__content__card">
        <form onSubmit={handleSubmitForm} action="submbit" className="my-form">
          <label>
            Nom Equipe
            <input name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
          </label>
          {/* <label>
            Nom Catégorie
            <input name="categorieId"
             onChange={handleChangeInput('categorieId')}
              value={categorieId} type="text" />
          </label> */}
          <div className="newteam__content__card--categorie">
            <p>CATEGORIES</p>
            <div className="newteam__content__card--categorie--label">
              {
                categories.map((categorie) => (
                  <label key={categorie.id}>
                    {categorie.nom}
                    <input name="categorieId" onChange={handleChangeInput('categorieId')} value={categorie.id} type="radio" />
                  </label>
                ))
              }
            </div>
          </div>
          <label>
            Statut
            <input name="statut" onChange={handleChangeInput('statut')} value={statut} type="text" />
          </label>
          <div className="file-input-section">
            <div className="dashed-box">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
                  <g fill="currentColor">
                    <path d="M22 14v-2.202l-.002-1.048L22 10H2v4c0 3.771 0 5.657 1.172 6.828C4.343 22 6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172C22 19.657 22 17.771 22 14Z" />
                    <path d="m11 4l-.55-.55c-.274-.274-.41-.41-.554-.53a4 4 0 0 0-2.18-.903C7.53 2 7.336 2 6.95 2c-.883 0-1.324 0-1.692.07A4 4 0 0 0 2.07 5.257C2 5.626 2 6.068 2 6.95V10h20l-.047-.75c-.072-1.049-.256-1.737-.723-2.256a2.984 2.984 0 0 0-.224-.225C20.151 6 18.834 6 16.202 6h-.374c-1.153 0-1.73 0-2.268-.153a4 4 0 0 1-.848-.352C12.224 5.224 11.816 4.815 11 4Z" opacity=".5" />
                  </g>
                </svg>
                <span>Choisir un fichier</span>
              </div>
              <input onChange={handleChangeInput('logo')} value={logo} type="file" name="logo" accept="image/png, image/jpg, image/jpeg" />
            </div>
          </div>
          <div className="my-form--button">
            <button type="submit">
              Valider
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default NewTeam;
