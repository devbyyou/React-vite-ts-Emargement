/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, {
  ChangeEvent, FormEvent, KeyboardEvent, useEffect,
} from 'react';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
  changeCredentialsField, createEquipe, fetchEquipesForUser,
  toggleIsOpen, updateEquipesForUser,
} from '../../../../store/reducers/equipes';
import { findAllCategories } from '../../../../store/reducers/categories';
import { Equipe } from '../../../../@types/user';
import { createJoueurForEquipe } from '../../../../store/reducers/joueurs';
import SeanceForm from './SeanceForm';
import uploadImage from '../../../../utils/cloudinary';
import useInputManager from '../../../../utils/useInputManager';

interface IopenClassNames {
  openClassNames:string,
  equipe: Equipe | undefined
  equipeId: string | undefined
  stateActiveRef : false | true
  joueur: []
  handleUpdatingPlayer: () => Promise<void>
  buttonSession: string
  ActiveSeance: true | false | undefined
}
function NewTeam({
  openClassNames, equipe, equipeId, stateActiveRef, buttonSession, ActiveSeance,
} :IopenClassNames) {
  const dispatch = useAppDispatch();
  const nom = useAppSelector((state) => state.equipes.credentials.nom);
  const prenom = useAppSelector((state) => state.equipes.credentials.prenom);
  const email = useAppSelector((state) => state.equipes.credentials.email);
  const tel = useAppSelector((state) => state.equipes.credentials.tel);
  const age = useAppSelector((state) => state.equipes.credentials.age);
  const categories = useAppSelector((state) => state.categories.categories);
  // const logo = useAppSelector((state) => state.equipes.credentials.logo);
  const statut = useAppSelector((state) => state.equipes.credentials.statut);
  const equipes = useAppSelector((state) => state.equipes.equipes);
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
  const {
    preview,
    getRootProps,
    getInputProps,
    isDragActive,
    createFormData,
  } = useInputManager();
  async function handleSubmitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = createFormData();
    if (!formData) return;
    try {
      const logo = await uploadImage(formData);
      await dispatch(createEquipe({ logo }));
      await dispatch(fetchEquipesForUser());
      dispatch(toggleIsOpen());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during form submission:', error);
    }
  }
  const handleChangeInput = (field: 'nom' | 'equipe_id' | 'categorieId' | 'categorie_id' | 'logo' | 'statut' | 'prenom' | 'email' | 'tel' | 'age') => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(changeCredentialsField({
      value,
      field,
    }));
  };

  async function handleSubmitFormUpdate(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = createFormData();
    if (!formData) return;
    try {
      const logo = await uploadImage(formData);
      // alert('0');
      await dispatch(updateEquipesForUser({ logo, equipeId }));
      // alert('2');
      // alert('2.5');
      await dispatch(fetchEquipesForUser());
      // alert('3');
      dispatch(toggleIsOpen());
      // alert('4');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during form submission:', error);
    }
  }
  async function AddPlayerSubmitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = createFormData();
    if (!formData) return;
    try {
      const logo = await uploadImage(formData);
      await dispatch(createJoueurForEquipe({ logo, equipeId }));
      await dispatch(fetchEquipesForUser());
      dispatch(toggleIsOpen());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during form submission:', error);
    }
  }
  return (
    <div className={openClassNames}>
      <div onClick={handleClickedClose} onKeyDown={handleKeyDown} role="button" tabIndex={0} className="modal-header">
        <button type="button" className="close " data-dismiss="modal" aria-hidden="true">
          x
        </button>
      </div>
      <div className="newteam__content__card ">
        {
        stateActiveRef === true && equipe ? (
          <form onSubmit={AddPlayerSubmitForm} action="submbit" className="my-form newplayer">
            <h2>Nouveau Joueur</h2>
            <label>
              Nom Joueur
              <input placeholder="Nom" name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
            </label>
            <label>
              Prenom Joueur
              <input placeholder="Prenom" name="prenom" onChange={handleChangeInput('prenom')} value={prenom} type="text" />
            </label>
            <label>
              Email
              <input placeholder="Email" name="email" onChange={handleChangeInput('email')} value={email} type="text" />
            </label>
            <div className="newplayerField">
              <label>
                Tel
                <input placeholder="Numéro" name="tel" onChange={handleChangeInput('tel')} value={tel} type="text" />
              </label>
              <label>
                age
                <input placeholder="Age" name="age" onChange={handleChangeInput('age')} value={age} type="text" />
              </label>
            </div>
            <div className="newteam__content__card--categorie">
              <p>CATEGORIES</p>
              <div className="newteam__content__card--categorie--label">
                {
                categories.map((categorie) => (
                  <label key={categorie.id}>
                    {categorie.nom}
                    <input name="categorie_id" onChange={handleChangeInput('categorie_id')} value={parseInt(categorie.id, 10)} type="radio" />
                  </label>
                ))
              }
              </div>
            </div>
            <div className="newteam__content__card--categorie">
              <p>Les équipes :</p>
              <div className="newteam__content__card--categorie--label">
                {
                equipes.map((equip) => (
                  <label key={equip.id}>
                    {equip.nom}
                    <input name="equipe_id" onChange={handleChangeInput('equipe_id')} value={equip.id} type="radio" />
                  </label>
                ))
              }
              </div>
            </div>
            <label>
              Statut
              <input placeholder="active" name="statut" onChange={handleChangeInput('statut')} value={statut} type="text" />
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
                </div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive
                    ? <p>Déposez les fichiers ici...</p>
                    : (
                      <p>
                        Faites glisser et déposez fichiers ici
                        <br />
                        {' '}
                        ou cliquez pour sélectionner des fichiers
                      </p>
                    )}
                </div>
                <img src={preview} alt="" />
              </div>
            </div>
            <div className="my-form--button">
              <button type="submit">
                Valider
              </button>
            </div>
          </form>
        ) : buttonSession && ActiveSeance ? (
          <SeanceForm />
        ) : stateActiveRef === false && equipe ? (
          <form onSubmit={handleSubmitFormUpdate} action="submit" className="my-form updateteam">
            <h2> Modification de L&apos;Equipe</h2>

            <label>
              Nom Equipe
              <input
                placeholder="Nom de equipe"
                name="nom"
                onChange={handleChangeInput('nom')}
                value={nom}
                type="text"
              />
            </label>

            <div className="newteam__content__card--categorie">
              <p>CATEGORIES</p>
              <div className="newteam__content__card--categorie--label">
                {
                categories.map((categorie) => (
                  <label key={categorie.id}>
                    {categorie.nom}
                    <input name="categorie_id" onChange={handleChangeInput('categorie_id')} value={categorie.id} type="radio" />
                  </label>
                ))
              }
              </div>
            </div>
            <label>
              Statut
              <input placeholder="active" name="statut" onChange={handleChangeInput('statut')} value={statut} type="text" />
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
                </div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive
                    ? <p>Déposez les fichiers ici...</p>
                    : (
                      <p>
                        Faites glisser et déposez fichiers ici
                        <br />
                        {' '}
                        ou cliquez pour sélectionner des fichiers
                      </p>
                    )}
                </div>
                <img src={preview} alt="" />
              </div>
            </div>
            <div className="my-form--button">
              <button type="submit">
                Valider
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitForm} action="submit" className="my-form newteam">
            <h2> Nouvelle Equipe</h2>
            <label>
              Nom Equipe
              <input placeholder="Nom equipe" name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
            </label>

            <div className="newteam__content__card--categorie">
              <p>CATEGORIES</p>
              <div className="newteam__content__card--categorie--label">
                {
                categories.map((categorie) => (
                  <label key={categorie.id}>
                    {categorie.nom}
                    <input name="categorie_id" onChange={handleChangeInput('categorie_id')} value={categorie.id} type="radio" />
                  </label>
                ))
              }
              </div>
            </div>
            <label>
              Statut
              <input placeholder="Active" name="statut" onChange={handleChangeInput('statut')} value={statut} type="text" />
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
                </div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive
                    ? <p>Déposez les fichiers ici...</p>
                    : (
                      <p>
                        Faites glisser et déposez fichiers ici
                        <br />
                        {' '}
                        ou cliquez pour sélectionner des fichiers
                      </p>
                    )}
                </div>
                <img src={preview} alt="" />
              </div>
            </div>
            <div className="my-form--button">
              <button type="submit">
                Valider
              </button>
            </div>
          </form>
        )
}
      </div>
    </div>
  );
}

export default NewTeam;
