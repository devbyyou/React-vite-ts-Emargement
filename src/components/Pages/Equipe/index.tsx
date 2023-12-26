import React, {
  ChangeEvent, FormEvent, MouseEvent, useEffect, useState,
} from 'react';
import './index.scss';
import { MdBolt } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import Header from '../Home/Header';
import logo from '../../../assets/devbyyou.png';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';
import { deleteEquipesForUser, toggleIsOpen } from '../../../store/reducers/equipes';
import NewTeam from '../Equipes/NewTeam';

function Equipe() {
  const navigate = useNavigate();
  const [stateInput, setStateInput] = useState('');
  const dispatch = useAppDispatch();
  const params = useParams();
  const equipeId = Object.values(params)[0];
  const categories = Object.values(params)[1];
  const equipes = useAppSelector((state) => state.equipes.equipes);
  const token = useAppSelector((state) => state.user.token.user);
  const isOpen = useAppSelector((state) => state.equipes.isOpen);
  const equipe = equipes.find(
    (eq) => (
      eq.id.toString() === equipeId
    ),
  );
  // console.log(equipeId);

  useEffect(() => {
    // logique pour charger les données de l'équipe si elles ne sont pas déjà chargées
  }, [equipeId]);

  if (!equipe) {
    // Gestion du cas où l'équipe n'est pas encore chargée
    return <div>Loading...</div>;
  }
  function handleChangeInput(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value;
    setStateInput(inputValue);
  }
  const filteredBYName = equipe.joueurs.filter(
    (joueur) => joueur.nom.toLowerCase().includes(stateInput.toLowerCase()),
  );

  function handleSubmitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }
  function handleClickToggle() {
    // J'emet mon intention / action
    dispatch(toggleIsOpen());
  }
  const openClassNames = cn('newteam__content', {
    'newteam__content--closed': !isOpen,
  });
  // eslint-disable-next-line max-len
  async function handleClickedButton(event: MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Suppression de l\'equipe ! Vous allez être redirigé vers la page des equipes :)');
    navigate('/equipes');
    window.location.reload();
    await dispatch(deleteEquipesForUser(equipeId));
  }

  return (
    <div>
      <NewTeam equipe={equipe} openClassNames={openClassNames} />
      <Header />
      <div className="equipe__content">
        <div className="equipe__content__informations">
          <div className="equipe__content__information-club">
            <div className="equipe__content__information-statut">
              <h3>{categories}</h3>
              <p>
                Nom:
                {' '}
                {equipe.nom}
              </p>
              <p>
                {' '}
                Crée :
                {' '}
                {`${functionConverteDate.convertDatee(equipe.created_at)} `}
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
              <img src={logo} alt="" />
              <button onClick={handleClickToggle} type="button">Modifier</button>
            </div>
          </div>

          <div className="equipe__content__information-effectif">
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
              {
            filteredBYName.map((joueur) => (
              <Link key={joueur.id} to="/equipes/senior/joueur" className="row">
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
                <div className="cell">{`${functionConverteDate.convertDateToDelay(joueur.derniere_activite)} min ago`}</div>
              </Link>
            ))
          }
            </div>
          </div>
        </div>

        <div className="equipe__content-action">
          <div className="equipe__content-action-card">

            <h3>
              <MdBolt />
              Actions
            </h3>
            <button onClick={handleClickedButton} type="button">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipe;
