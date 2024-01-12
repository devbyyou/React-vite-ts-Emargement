/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, {
  ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState, useCallback,
} from 'react';
import { useDropzone } from 'react-dropzone';
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

interface IopenClassNames {
  openClassNames:string,
  equipe: Equipe | undefined
  equipeId: string | undefined
  stateActiveRef : false | true
  joueur: []
  handleUpdatingPlayer: () => Promise<void>
  buttonSession: string
}
function NewTeam({
  openClassNames, equipe, equipeId, stateActiveRef, handleUpdatingPlayer, joueur, buttonSession,
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
  // const [file, setFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const onDrop = useCallback((acceptedFiles : FileList) => {
    // eslint-disable-next-line new-parens
    const file = new FileReader;
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);
  const {
    acceptedFiles, getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    // ----------------------partie du test --------------------------//
    if (typeof acceptedFiles[0] === 'undefined') return;
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'react-uploads-unsigned');
    formData.append('api_key', import.meta.env.VITE_CLOUDINATY_API_KEY);
    const results = await fetch('https://api.cloudinary.com/v1_1/dvj8v54gi/image/upload', {
      method: 'POST',
      body: formData,
    }).then((r) => r.json());
    const logo = results.secure_url;
    // ----------------------partie du test --------------------------//
    await dispatch(createEquipe(logo));
    await dispatch(fetchEquipesForUser());
    dispatch(toggleIsOpen());
  }
  const handleChangeInput = (field: 'nom' | 'equipe_id' | 'categorieId' | 'categorie_id' | 'logo' | 'statut' | 'prenom' | 'email' | 'tel' | 'age') => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // if (field === 'logo') {
    //   const target = event.target as HTMLInputElement & {
    //     files: FileList;
    //   };
    //   setFile(target.files[0]);
    // } else {
    dispatch(changeCredentialsField({
      value,
      field,
    }));
    // }
  };

  async function handleSubmitFormUpdate(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Modification de l\'equipe ! ');
    // navigate('/equipes');
    await dispatch(updateEquipesForUser(equipeId));
    await dispatch(fetchEquipesForUser());
    dispatch(toggleIsOpen());
    // window.location.reload();
  }
  async function AddPlayerSubmitForm(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await dispatch(createJoueurForEquipe(equipeId));
    await dispatch(fetchEquipesForUser());
    // eslint-disable-next-line no-alert
    alert(`Ajout de ${prenom} ${nom} Avec succès ! :)`);
    dispatch(toggleIsOpen());
  }

  return (
    <div className={openClassNames}>
      <div onClick={handleClickedClose} onKeyDown={handleKeyDown} role="button" tabIndex={0} className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
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
              <input name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
            </label>
            <label>
              Prenom Joueur
              <input name="prenom" onChange={handleChangeInput('prenom')} value={prenom} type="text" />
            </label>
            <label>
              Email
              <input name="email" onChange={handleChangeInput('email')} value={email} type="text" />
            </label>
            <div className="newplayerField">
              <label>
                Tel
                <input name="tel" onChange={handleChangeInput('tel')} value={tel} type="text" />
              </label>
              <label>
                age
                <input name="age" onChange={handleChangeInput('age')} value={age} type="text" />
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
                <input
                  onChange={handleChangeInput('logo')}
                  // value={logo}
                  type="file"
                  name="logo"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
            </div>
            <div className="my-form--button">
              <button type="submit">
                Valider
              </button>
            </div>
          </form>
        ) : stateActiveRef === false && equipe ? (
          <form onSubmit={handleSubmitFormUpdate} action="submit" className="my-form updateteam">
            <h2> Modification de L&apos;Equipe</h2>

            <label>
              Nom Equipe
              <input name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
            </label>

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
                <input
                  onChange={handleChangeInput('logo')}
                // value={logo}
                  type="file"
                  name="logo"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
            </div>
            <div className="my-form--button">
              <button type="submit">
                Valider
              </button>
            </div>
          </form>
        ) : buttonSession ? (
          <SeanceForm />
        ) : stateActiveRef === false && equipe ? (
          <form onSubmit={handleSubmitFormUpdate} action="submit" className="my-form updateteam">
            <h2> Modification de L&apos;Equipe</h2>

            <label>
              Nom Equipe
              <input name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
            </label>

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
                <input
                  onChange={handleChangeInput('logo')}
                //  value={logo}
                  type="file"
                  name="logo"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
            </div>
            <div className="my-form--button">
              <button type="submit">
                Valider
              </button>
            </div>
          </form>
        ) : stateActiveRef === true && joueur ? (
          <form onSubmit={handleUpdatingPlayer} action="submit" className="my-form updatePlayer">
            <h2>Modification Joueur</h2>
            <label>
              Nom Joueur
              <input name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
            </label>
            <label>
              Prenom Joueur
              <input name="prenom" onChange={handleChangeInput('prenom')} value={prenom} type="text" />
            </label>
            <label>
              Email
              <input name="email" onChange={handleChangeInput('email')} value={email} type="text" />
            </label>
            <div className="newplayerField">
              <label>
                Tel
                <input name="tel" onChange={handleChangeInput('tel')} value={tel} type="text" />
              </label>
              <label>
                age
                <input name="age" onChange={handleChangeInput('age')} value={age} type="text" />
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
                <input
                  onChange={handleChangeInput('logo')}
                // value={logo}
                  type="file"
                  name="logo"
                  accept="image/png, image/jpg, image/jpeg"
                />
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
              <input name="nom" onChange={handleChangeInput('nom')} value={nom} type="text" />
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
                {/* <input
                  onChange={handleChangeInput('logo')}
                  // value={logo}
                  type="file"
                  name="logo"
                  accept="image/png, image/jpg, image/jpeg"
                /> */}
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
        isDragActive
          ? <p>Drop the files here ...</p>
          : <p>Drag 'n' drop some files here, or click to select files</p>
      }
                </div>
                <img src={preview} />
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
