/* eslint-disable max-len */
import React, {
  FormEventHandler, MouseEventHandler, useEffect, useState,
} from 'react';
import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
// import classNames from 'classnames';
import cn from 'classnames';
import Header from '../Home/Header';
import logo from '../../../assets/avatar0.jpg';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import functionConverteDate from '../Home/MembersList/ConverteDate';
import NewTeam from '../Equipes/NewTeam';
import { fetchEquipesForUser, toggleIsOpen } from '../../../store/reducers/equipes';
import { deleteJoueurs, updateJoueurForUser } from '../../../store/reducers/joueurs';

function Joueur() {
  const navigate = useNavigate();
  const [stateActiveRef, setActiveRef] = useState(false);
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
    setActiveRef(true);
    dispatch(toggleIsOpen());
  };
  const handleDeletePlayer: MouseEventHandler<HTMLButtonElement> = async () => {
    // eslint-disable-next-line no-alert
    alert('le joueur va etre supprimer. Riderectuion ');
    await dispatch(deleteJoueurs(joueurId));
    navigate(`/equipes/${equipeTrouvee?.categories.nom}/${equipeTrouvee?.id}`);
  };
  const handleUpdatingPlayer: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setActiveRef(true);
    try {
      await dispatch(updateJoueurForUser(joueurId));
      await dispatch(fetchEquipesForUser());
      dispatch(toggleIsOpen());
    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour du joueur:", error);
    }
  };

  const openClassNames = cn('newteam__content', {
    'newteam__content--closed': !isOpen,
  });
  return (
    <div className="joueur__content">
      <NewTeam
        openClassNames={openClassNames}
        stateActiveRef={stateActiveRef}
        handleUpdatingPlayer={handleUpdatingPlayer}
        joueur={joueur}
        // equipeId={equipeId}
      />
      <Header />
      <div className="joueur__banniere">
        <img src={joueur.logo ? joueur.logo : logo} alt="" />
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

          {
          /* <div className="timeline-event-block block">
            <div className="block-header block-header-default">
              <h3 className="block-title">Informations sur les parents/tuteurs</h3>
              <div className="block-options">
                <button type="button" className="btn btn-sm btn-light" data-bs-toggle="modal" data-bs-target="#modal_student_guardian_edit">Modifier</button>
              </div>
            </div>
            <div className="block-content">
              <table className="table table-striped table-vcenter table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>E-mail</th>
                    <th>Téléphone mobile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Aucun parent/tuteur légal trouvé</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */
          }

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
                      <a href="https://www.myattendancetracker.com/class/view/imMoozZzFcpCDL7rXWVScRXZXHOJmP">
                        {' '}
                        {equipeTrouvee?.categories.nom}
                        {' - '}
                        {equipeTrouvee?.nom}
                      </a>

                    </td>
                    <td><span>Absent</span></td>
                  </tr>
                  <tr>
                    <td>2023-02-12</td>
                    <td>
                      <a href="https://www.myattendancetracker.com/class/view/imMoozZzFcpCDL7rXWVScRXZXHOJmP">
                        {' '}
                        {equipeTrouvee?.categories.nom}
                        {' - '}
                        {equipeTrouvee?.nom}
                      </a>

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
