/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-alert */
import React, {
  ChangeEvent, FormEvent, MouseEvent, useEffect, useState,
} from 'react';
import './index.scss';
import { MdBolt } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import Header from '../Home/Header';
// import logo from '../../../assets/devbyyou.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';
import { deleteEquipesForUser, toggleIsOpen } from '../../../store/reducers/equipes';
import NewTeam from '../Equipes/NewTeam';
import { fetchCoaches } from '../../../store/reducers/coaches';
// import { fetchSeancesForUser } from '../../../store/reducers/seance';

function Equipe() {
  const navigate = useNavigate();
  const [stateInput, setStateInput] = useState('');
  const [stateActiveRef, setstateActiveRef] = useState<boolean | undefined | any>(false);
  const [buttonSession, setbuttonSession] = useState('');
  const [ActiveSeance, setstateActiveSeance] = useState<true | false | undefined>(undefined);
  const dispatch = useAppDispatch();
  const params = useParams();
  const equipeId = Object.values(params)[0];
  const equipes = useAppSelector((state) => state.equipes.equipes);
  // const equipeId = Object.values(params)[1];
  const token = useAppSelector((state) => state.user.token.user);
  const isOpen = useAppSelector((state) => state.equipes.isOpen);
  // const credentials = useAppSelector((state) => state.seance.credentials);

  const equipe = equipes.find(
    (eq) => (
      eq.id.toString() === equipeId
    ),
  );

  useEffect(() => {
    dispatch(fetchCoaches());
    // dispatch(fetchSeancesForUser());
  }, [dispatch, equipes, equipe]);

  if (!equipe) {
    return <div>Loading...</div>;
  }
  function handleChangeInput(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    setStateInput(inputValue);
  }
  const filteredBYName = equipe.joueurs.filter(
    (joueur) => joueur.nom.toLowerCase().includes(stateInput.toLowerCase()),
  );
  if (!equipe.seances) {
    return <div>Loading...</div>;
  }
  const filteredBYid = equipe.seances.filter((seance) => seance);

  function handleSubmitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }
  function handleClickToggle() {
    setstateActiveRef(false);
    setstateActiveSeance(false);
    dispatch(toggleIsOpen());
  }
  const openClassNames = cn('newteam__content', {
    'newteam__content--closed': !isOpen,
  });
  // eslint-disable-next-line max-len
  const handleClickedButton : React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-restricted-globals, no-alert
    alert('Suppression de l\'equipe ! Vous allez être redirigé vers la page des equipes :)');
    // window.location.reload();
    await dispatch(deleteEquipesForUser({ equipeId }));
    // await dispatch(fetchEquipesForUser());

    navigate('/equipes');
  };
  function AddJoueurClickedButton() {
    setstateActiveRef(true);
    dispatch(toggleIsOpen());
  }

  const AddSeanceClickedButton = (event: MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
    dispatch(toggleIsOpen());
    setstateActiveRef(undefined);
    setbuttonSession(event.target.value);
    setstateActiveSeance(true);
  };

  return (
    <div className="content__equipe">
      <NewTeam
        equipeId={equipeId}
        equipe={equipe}
        openClassNames={openClassNames}
        stateActiveRef={stateActiveRef}
        buttonSession={buttonSession}
        ActiveSeance={ActiveSeance}
        joueur={[]}
        handleUpdatingPlayer={function (): Promise<void> {
          throw new Error('Function not implemented.');
        }}
      />
      <Header />
      <div className="equipe__content">
        <div className="equipe__content__informations">
          <div className="equipe__content__information-club">
            <div className="equipe__content__information-statut">
              <h3>{equipe.categories.nom}</h3>
              <p>
                Nom:
                {' '}
                {equipe.nom}
              </p>
              <p>
                {' '}
                Crée :
                {' '}
                {`${functionConverteDate.calendaraDate(equipe.created_at)} `}
                {/* {equipe.created_at} */}
              </p>
              <p>
                Statut :
                {' '}
                {equipe.statut}
              </p>
              <p>
                Entraineur:
                {' '}
                {token.prenom}
                {' '}
                {token.nom}
              </p>
            </div>
            <div className="equipe__content__information-logo">
              <img src={equipe.logo} alt="" />
              <button onClick={handleClickToggle} type="button">Modifier</button>
            </div>
          </div>

          <div className="equipe__content__information-effectif">
            <div>

              <div className="header">
                <h2 className="titleMembre">Membres</h2>
              </div>
              <form onSubmit={handleSubmitForm} className="search-bar">
                <CiSearch className="logo__search_members-equipe" />
                <input value={stateInput} onChange={handleChangeInput} type="text" placeholder="Rechercher par nom" />
              </form>
              <div className="table tablenoScrool">
                <div className="row label noScrool">
                  <div className="cell">Nom</div>
                  <div className="cell">Catégories</div>
                  <div className="cell">Dernière Activité</div>
                </div>
                { filteredBYName.map((joueur) => (

                  <Link key={joueur.id} to={`/equipes/joueur/${joueur.categorie_id}/${joueur.id}`} className="row">

                    <div className="cell">
                      {joueur.nom}
                      {' '}
                      {joueur.prenom}
                      <div className="table__email">{joueur.email}</div>
                    </div>

                    <div className="cell owner">
                      .
                      {' '}
                      {equipe.categories.nom}
                    </div>

                    <div className="cell">
                      {`${functionConverteDate.convertDateToDelay(joueur.derniere_activite)} min ago`}
                    </div>

                  </Link>
                ))}
              </div>

              <div className="content__ListSeance">
                <header className="header">
                  <h2 className="titleMembre">Séances</h2>
                </header>
                <div className="table tablenoScrool">
                  <div className="row label noScrool rowSeance">
                    <div className="cell">Id</div>
                    <div className="cell">Equipe/Catégorie</div>
                    <div className="cell">Localisation</div>
                    <div className="cell">Jours/Heure</div>
                    <div className="cell">Coach</div>
                  </div>
                  {filteredBYid.map((seance) => (
                    <div key={seance.id} className="row rowSeance">
                      <div className="cell">
                        {seance.id}
                        {/* <div className="table__email">test</div> */}
                      </div>
                      <div className="cell owner">
                        {equipe.nom}
                        {' '}
                        -
                        {' '}
                        {equipe.categories.nom}
                      </div>
                      <div className="cell">
                        {' '}
                        {seance.lieu}
                        {' '}
                      </div>
                      <div className="cell">
                        {functionConverteDate.calendaraDate(seance.date)}
                        {' - '}
                        {seance.heure}
                        {' '}

                      </div>
                      <div className="cell">
                        {' '}
                        {token.prenom}
                        {' '}
                        {token.nom}
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="equipe__content-action">
          <div className="equipe__content-action-card">

            <h3>
              <MdBolt />
              Actions
            </h3>
            <div className="content__button">
              <button
                className="buttonNewPlayer"
                onClick={AddJoueurClickedButton}
                type="button"
              >
                Ajoutez Nouveau Joueur
              </button>
              <button
                className="buttonNewPlayer"
                onClick={AddSeanceClickedButton}
                type="button"
                value="AddSeance"
              >
                Ajoutez une Seance
              </button>
              <button onClick={handleClickedButton} type="button">
                Supprimer
                {' '}
                {equipe.nom}

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Equipe;
