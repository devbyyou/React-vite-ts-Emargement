/* eslint-disable max-len */
import React, {
  ChangeEvent,
  FormEventHandler, KeyboardEvent, MouseEventHandler, useEffect,
  //  useState,
} from 'react';
import '../Equipes/NewTeam/index.scss';
import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
// import classNames from 'classnames';
import cn from 'classnames';
import Header from '../Home/Header';
// import logo from '../../../assets/avatar0.jpg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';
// import NewTeam from '../Equipes/NewTeam';
import { changeCredentialsField, fetchEquipesForUser, toggleIsOpen } from '../../../store/reducers/equipes';
import { deleteJoueurs, updateJoueurForUser } from '../../../store/reducers/joueurs';
import uploadImage from '../../../utils/cloudinary';
import useInputManager from '../../../utils/useInputManager';

function Joueur() {
  const {
    preview,
    getRootProps,
    getInputProps,
    isDragActive,
    createFormData,
  } = useInputManager();
  // const dispatch = useAppDispatch();
  const nom = useAppSelector((state) => state.equipes.credentials.nom);
  const prenom = useAppSelector((state) => state.equipes.credentials.prenom);
  const email = useAppSelector((state) => state.equipes.credentials.email);
  const tel = useAppSelector((state) => state.equipes.credentials.tel);
  const age = useAppSelector((state) => state.equipes.credentials.age);
  const categories = useAppSelector((state) => state.categories.categories);
  // const logo = useAppSelector((state) => state.equipes.credentials.logo);
  const statut = useAppSelector((state) => state.equipes.credentials.statut);
  // const equipes = useAppSelector((state) => state.equipes.equipes);

  const navigate = useNavigate();
  // const [stateActiveRef, setActiveRef] = useState(false);
  // const [equipeId, setEquipeId] = useState<string | undefined>();

  const dispatch = useAppDispatch();
  const params = useParams();
  const joueurId = Object.values(params)[1];
  // const equipeId = Object.values(params)[0];
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const isOpen = useAppSelector((state) => state.equipes.isOpen);
  const listesJoueur = equipes.map((equipe) => equipe.joueurs.map((player) => player));
  const joueurs = listesJoueur.map((lesjoueurs) => lesjoueurs.find((joueur) => joueur.id.toString() === joueurId));
  const joueur = joueurs.find((findJoueur) => findJoueur);
  // const equipeTrouvee = equipes.find((listEquipe) => listEquipe.categories.id.toString() === joueur?.categorie_id.toString());
  // const equipeTrouvee = equipes.find((equipe) => equipe.joueurs.some((player) => player.id.toString() === joueurId?.toString()));
  const equipeTrouvee = equipes.find((equipe) => equipe.joueurs.some((player) => player.id.toString() === joueurId?.toString()));

  useEffect(() => {
    // logique pour charger les données de l'équipe si elles ne sont pas déjà chargées
    // dispatch(updateEquipesForUser());
  }, [joueur, equipes]);

  if (!joueur) {
    // Gestion du cas où l'équipe n'est pas encore chargée
    return <div>Loading...</div>;
  }

  const handleDisplayCard : MouseEventHandler<HTMLButtonElement> = () => {
    // throw new Error('Function not implemented.');
    // setActiveRef(true);
    dispatch(toggleIsOpen());
  };
  const handleDeletePlayer: MouseEventHandler<HTMLButtonElement> = async () => {
    // eslint-disable-next-line no-alert
    alert('le joueur va etre supprimer. Riderectuion ');
    await dispatch(deleteJoueurs({ joueurId }));
    navigate(`/equipes/${equipeTrouvee?.categories.nom}/${equipeTrouvee?.id}`);
  };

  const handleUpdatingPlayer: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = createFormData();
    console.log('test 1');
    if (!formData) return;
    console.log('test 2');
    // setActiveRef(true);
    try {
      const logo = await uploadImage(formData);
      await dispatch(updateJoueurForUser({ logo, joueurId }));
      await dispatch(fetchEquipesForUser());
      dispatch(toggleIsOpen());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Une erreur s'est produite lors de la mise à jour du joueur:", error);
    }
  };
  const handleChangeInput = (field: 'nom' | 'equipe_id' | 'categorieId' | 'categorie_id' | 'logo' | 'statut' | 'prenom' | 'email' | 'tel' | 'age') => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(changeCredentialsField({
      value,
      field,
    }));
  };

  const openClassNames = cn('newteam__content', {
    'newteam__content--closed': !isOpen,
  });
  const handleClickedClose = () => {
    dispatch(toggleIsOpen());
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Esc') {
      dispatch(toggleIsOpen());
    }
  };
  return (
    <div className="joueur__content">
      <div className={openClassNames}>
        <div onClick={handleClickedClose} onKeyDown={handleKeyDown} role="button" tabIndex={0} className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
            x
          </button>
        </div>
        <div className="newteam__content__card ">
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
        </div>
      </div>

      {/* <NewTeam
        openClassNames={openClassNames}
        stateActiveRef={stateActiveRef}
        handleUpdatingPlayer={handleUpdatingPlayer}
        joueur={joueur}
        // equipeId={equipeId}
      /> */}
      <Header />
      <div className="joueur__banniere">
        <img src={joueur.logo} alt="" />
        <h1>
          {joueur.prenom}
          {' '}
          {joueur.nom}
        </h1>
      </div>
      <div className="cts">
        <div className="joueur__content">

          <div className="joueur__informations">
            <div className="joueur__informations-title">
              <h3>Information Personnelles</h3>
              <button onClick={handleDeletePlayer} className="colorRed" type="button">Supprimer</button>
              {/* <button type="button">Modifier photo</button> */}
              <button type="button" onClick={handleDisplayCard}>Modifier les informations</button>
            </div>

            <div className="block-content">
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Date de creation:</div>
                <div className="col-md-8">{functionConverteDate.calendaraDate(joueur.created_at)}</div>
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Statut:</div>
                <div className="col-md-8"><span className="badge rounded-pill bg-primary">{joueur.statut}</span></div>
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Email: </div>
                <div className="col-md-8">
                  {joueur.email}
                </div>
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Home phone:</div>
                <div className="col-md-8">
                  {' - '}

                </div>
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Telephone portable:</div>
                <div className="col-md-8">
                  {joueur.tel}
                </div>
              </div>
            </div>

          </div>

          <div className="timeline-event-block block">
            <div className="block-header block-header-default">
              <h3 className="block-title">Participation récente</h3>
              <div className="block-options">
                <div className="timeline-event-time block-options-item fs-sm" />
              </div>
            </div>
            <div className="block-content">
              <table className="table table-striped table-vcenter table-bordered table-hover table-responsive">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Equipe</th>
                    <th>Présence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2023-11-09</td>
                    <td>

                      {' '}
                      {equipeTrouvee?.categories.nom}
                      {' - '}
                      {equipeTrouvee?.nom}

                    </td>
                    <td><span>Absent</span></td>
                  </tr>
                  <tr>
                    <td>2023-02-12</td>
                    <td>

                      {' '}
                      {equipeTrouvee?.categories.nom}
                      {' - '}
                      {equipeTrouvee?.nom}

                    </td>
                    <td><span className="tardif">Tardif</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* fin informations */}

        </div>
        <div className="joueur__div">
          <div className="joueur__div-card">
            <h3>
              Equipe
              <button type="button" onClick={handleDisplayCard}> Modifier</button>
            </h3>
            <p>
              {equipeTrouvee?.categories.nom}
              {' - '}
              {equipeTrouvee?.nom}
            </p>
          </div>
        </div>

        {/* fin content space bt */}
      </div>
      {/* fin cts */}
    </div>
  );
}

export default Joueur;
