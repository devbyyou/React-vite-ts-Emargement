/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import ProfilePictureSection from './ProfilePictureSection';
import './index.scss';
import { changeCredentialsField, updateCoache } from '../../../store/reducers/coaches';
import { removeUserDataFromLocalStorage } from '../../../utils/user';
import { updateJoueurs } from '../../../store/reducers/joueurs';

function Parametre() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.coaches.credentials.email);
  const password = useAppSelector((state) => state.coaches.credentials.password);
  const prenom = useAppSelector((state) => state.coaches.credentials.prenom);
  const nom = useAppSelector((state) => state.coaches.credentials.nom);
  const role = useAppSelector((state) => state.coaches.credentials.role);
  // const tel = useAppSelector((state) => state.coaches.credentials.tel);
  // const logo = useAppSelector((state) => state.coaches.credentials.logo);
  // const banniere = useAppSelector((state) => state.coaches.credentials.banniere);
  console.log(email);
  const token = useAppSelector((state) => state.user.token);
  const { joueur, user } = token;

  const handleChangeCredentials = (field:'email' | 'password' | 'prenom' | 'nom' | 'tel' | 'role' | 'logo' | 'banniere') => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(changeCredentialsField({
      field,
      value,
    }));
  };

  const handleSubmitUpdate = async (event: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      await dispatch(updateCoache());
    } else {
      await dispatch(updateJoueurs());
    }
  };

  const handleClickedButton: MouseEventHandler<HTMLButtonElement> = async () => {
    navigate('/');
    setTimeout(() => {
      removeUserDataFromLocalStorage();
      window.location.reload();
    }, 1);
  };
  return (
    <div className="parametre__content">
      <header className="parametre__content-header">
        <h2>Mon Compte</h2>
        <p>D'ici, vous pouvez modifier vos informations</p>
        <div className="parametre__content-logout">
          <button onClick={handleClickedButton} type="button" className="parametre__content-logout-btn">Déconnexion</button>
        </div>
      </header>
      <div className="parametre__content-except">

        <div className="parametre__content-forms">
          <div className="parametre__content-form-title">
            <h3 className="parametre__content-title"> Information personnelles</h3>
            <p className="parametre__content-text">
              Vous pouvez modifier vos informations personnelles sur cette page.
              Votre mot de passe vous sera demandé pour toute modification,
              juste par sécurité.
            </p>
            <form onSubmit={handleSubmitUpdate} className="parametre__content-form" action="submbit">
              <label className="parametre__content-label">
                Adresse email
                <input name="email" onChange={handleChangeCredentials('email')} className="parametre__content-form-input" type="email" placeholder="Votre e-mail" value={email} />
              </label>
              <div className="parametre__content-form-nom-prenom">
                <label className="parametre__content-label">
                  Prénom
                  <input name="prenom" onChange={handleChangeCredentials('prenom')} className="parametre__content-form-input -prenom" type="text" value={prenom} />
                </label>
                <label className="parametre__content-label">
                  Nom
                  <input value={nom} name="nom" onChange={handleChangeCredentials('nom')} className="parametre__content-form-input -nom" type="text" />
                </label>
              </div>
              <label className="parametre__content-label">
                Rôle
                <input value={role} name="role" onChange={handleChangeCredentials('role')} className="parametre__content-form-input -role" type="text" />
              </label>
              <label className="parametre__content-label">
                Mot de passe
                <input name="password" value={password} onChange={handleChangeCredentials('password')} className="parametre__content-form-input -role" type="password" />
              </label>
              <div className="parametre__content-form-btn-mdf">
                <button onClick={handleSubmitUpdate} type="button">
                  Modifier
                </button>
              </div>
            </form>
          </div>

          {/* <div className="parametre__content-form-title">
            <h3 className="parametre__content-title">Sécurité</h3>
            <p className="parametre__content-text">
             Vous Pouvez modifier votre mot de passe dans cette partie</p>
            <form className="parametre__content-form" action="submit">
              <label className="parametre__content-label">
                Mot de passe actuel
                <input className="parametre__content-form-input -password" type="password" />
              </label>
              <label className="parametre__content-label">
                Nouveau mot de passe
                <input className="parametre__content-form-input -password" type="password" />
              </label>
              <div className="parametre__content-form-btn-mdf">
                <button type="button">
                  Modifier
                </button>
              </div>
            </form>
          </div> */}

          <div className="photo__profil">
            <ProfilePictureSection message={undefined} banniere={undefined} />
            <ProfilePictureSection message="Photo de la banniere" banniere="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blta5430aa84eaf12ac/60dc1336d9a5243b669e0a4e/908c03edb3472af2dd58ae3fee29c9569c5aefb2.jpg?auto=webp&format=pjpg&width=1080&quality=60" />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Parametre;
