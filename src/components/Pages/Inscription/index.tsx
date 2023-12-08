import React, { ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { changeCredentialsField, inscription } from '../../../store/reducers/inscription';
// import { fetchCoaches } from '../../../store/reducers/coaches';

function Inscription() {
  const email = useAppSelector((state) => state.inscription.credentials.email);
  const password = useAppSelector((state) => state.inscription.credentials.password);
  const nom = useAppSelector((state) => state.inscription.credentials.nom);
  const prenom = useAppSelector((state) => state.inscription.credentials.prenom);
  const role = useAppSelector((state) => state.inscription.credentials.role);
  const tel = useAppSelector((state) => state.inscription.credentials.tel);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line max-len
  const HandlerChangeField = (field: 'email' | 'password' | 'prenom' | 'nom' | 'tel' | 'role') => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(changeCredentialsField({
      value,
      field,
    }));
  };

  function handlerSubmit(event: FormEvent<HTMLDivElement>): void {
    event.preventDefault();
    dispatch(inscription());
  }

  return (
    <div onSubmit={handlerSubmit}>
      {' '}
      <form className="parametre__content-form inscriptionTest" action="submbit">
        <label className="parametre__content-label">
          Adresse email
          <input onChange={HandlerChangeField('email')} className="parametre__content-form-input" type="email" placeholder="Votre e-mail" value={email} name="email" />
        </label>
        <div className="parametre__content-form-nom-prenom">
          <label className="parametre__content-label">
            Prénom
            <input onChange={HandlerChangeField('prenom')} className="parametre__content-form-input -prenom" type="text" value={prenom} name="prenom" />
          </label>
          <label className="parametre__content-label">
            Nom
            <input onChange={HandlerChangeField('nom')} value={nom} className="parametre__content-form-input -nom" type="text" name={nom} />
          </label>
          <label className="parametre__content-label">
            Tel
            <input onChange={HandlerChangeField('tel')} value={tel} className="parametre__content-form-input -nom" type="text" name="tel" />
          </label>
        </div>
        <label className="parametre__content-label">
          Rôle
          <input onChange={HandlerChangeField('role')} className="parametre__content-form-input -role" value={role} type="text" name="role" />
        </label>
        <label className="parametre__content-label">
          Mot de passe
          <input onChange={HandlerChangeField('password')} className="parametre__content-form-input -role" value={password} type="text" name="password" />
        </label>
        <div className="parametre__content-form-btn-mdf">
          <button type="submit">
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Inscription;
