/* eslint-disable react/no-unescaped-entities */
import './index.scss';

function Parametre() {
  return (
    <div className="parametre__content">
      <header className="parametre__content-header">
        <h2>Mon Compte</h2>
        <p>D'ici, vous pouvez modifier vos informations</p>
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
            <form className="parametre__content-form" action="submbit">
              <label className="parametre__content-label">
                Adresse email
                <input className="parametre__content-form-input" type="email" placeholder="Votre e-mail" value="lyy.pro@gmail.com" />
              </label>
              <div className="parametre__content-form-nom-prenom">
                <label className="parametre__content-label">
                  Prénom
                  <input className="parametre__content-form-input -prenom" type="text" value="Youssouf" />
                </label>
                <label className="parametre__content-label">
                  Nom
                  <input value="Ly" className="parametre__content-form-input -nom" type="text" />
                </label>
              </div>
              <label className="parametre__content-label">
                Rôle
                <input className="parametre__content-form-input -role" value="Coach" type="text" />
              </label>
              <label className="parametre__content-label">
                Mot de passe actuel - juste par sécurité
                <input className="parametre__content-form-input -role" value="" type="password" />
              </label>
              <div className="parametre__content-form-btn-mdf">
                <button type="button">
                  Modifier
                </button>
              </div>
            </form>
          </div>

          <div className="parametre__content-form-title">
            <h3 className="parametre__content-title">Sécurité</h3>
            <p className="parametre__content-text"> Vous Pouvez modifier votre mot de passe dans cette partie</p>
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
          </div>
        </div>

        <div className="parametre__content-logout">
          <button type="button" className="parametre__content-logout-btn">Déconnexion</button>
        </div>
      </div>
    </div>
  );
}

export default Parametre;
