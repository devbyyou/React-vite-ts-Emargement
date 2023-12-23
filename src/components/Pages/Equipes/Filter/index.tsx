import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import './index.scss';
import { useAppSelector } from '../../../../hooks/redux';
import { Equipe } from '../../../../@types/user';

interface IsetfilteredByCheckbox {
  setfilteredByCheckbox: React.Dispatch<React.SetStateAction<Equipe[]>>;
  setActiveNumber: React.Dispatch<React.SetStateAction<Equipe[]>>;
  activeNumber: Equipe[] | null
}

function Filter({ setfilteredByCheckbox, setActiveNumber, activeNumber }: IsetfilteredByCheckbox) {
  // const user = useAppSelector((state) => state.user.token.user);
  // const { equipes } = user;
  const equipes = useAppSelector((state) => state.equipes.equipes);

  const categories = equipes.map((listeEquipes) => listeEquipes.categories);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const prevFilteredByCategory = useRef<Equipe[]>(equipes);
  // Utilisez un tableau pour suivre les catégories actives
  const filteredByCategory = equipes.filter((element) => (
    activeCategories.includes(element.categories.nom.toLowerCase())
  ));
  // astuce pour ne pas répéter plusieurs fois la même catégorie
  // Utilisons un ensemble pour suivre les clés déjà rencontrées
  const seenKeys = new Set();
  // Filtrons les catégories pour ne montrer que celles avec des clés uniques
  const uniqueCategories = categories.filter((category) => {
    const isUnique = !seenKeys.has(category.id);
    seenKeys.add(category.id);
    return isUnique;
  });

  const foundCardLess = equipes.filter((equipe) => (equipe.joueurs.length < 10));
  // eslint-disable-next-line max-len
  const foundCardMoreLess = equipes.filter((equipe) => (equipe.joueurs.length > 10 && equipe.joueurs.length < 40));
  const foundCardMore = equipes.filter((equipe) => (equipe.joueurs.length > 40));
  // console.log(foundCardMore);

  function handleClickCheckbox(event: ChangeEvent<HTMLInputElement>): void {
    const checkboxValue = event.target.value;

    if (checkboxValue === '+40') {
      // Si la carte est déjà présente dans activeNumber, la retire
      if (activeNumber && activeNumber.length > 0) {
        setActiveNumber([]);
      } else {
        // Sinon, ajoute la carte à activeNumber
        setActiveNumber(foundCardMore);
      }
    } if (checkboxValue === '10-40') {
      // Si la carte est déjà présente dans activeNumber, la retire
      if (activeNumber && activeNumber.length > 0) {
        setActiveNumber([]);
      } else {
        // Sinon, ajoute la carte à activeNumber
        setActiveNumber(foundCardMoreLess);
      }
    } if (checkboxValue === '10') {
    // Si la carte est déjà présente dans activeNumber, la retire
      if (activeNumber && activeNumber.length > 0) {
        setActiveNumber([]);
      } else {
      // Sinon, ajoute la carte à activeNumber
        setActiveNumber(foundCardLess);
      }
    } else if (activeCategories.includes(checkboxValue)) {
    // Si la catégorie est déjà active, la retire du tableau
      const retireTabCategory = activeCategories.filter((category) => category !== checkboxValue);
      setActiveCategories(retireTabCategory);
    } else {
    // Si la catégorie n'est pas active, l'ajoute au tableau
      setActiveCategories([...activeCategories, checkboxValue]);
      // setActiveNumber([]);
    }
  }
  // Mise à jour du filtre
  useEffect(() => {
    // eslint-disable-next-line max-len
    if (foundCardMoreLess.length && foundCardMore.length && foundCardLess.length === 0 && activeNumber && activeNumber.length > 0) {
      // Si la checkbox '10' est activée et activeNumber est déjà défini, réinitialise activeNumber
      setActiveNumber([]);
    } else if (filteredByCategory.length !== prevFilteredByCategory.current.length) {
      setfilteredByCheckbox(filteredByCategory);
      prevFilteredByCategory.current = filteredByCategory;
    }
  // eslint-disable-next-line max-len
  }, [filteredByCategory, setfilteredByCheckbox, foundCardLess, activeNumber, setActiveNumber, foundCardMore.length, foundCardMoreLess.length]);
  return (
    <div className="filter">
      <h2>Filtrer par</h2>

      <div className="card__filer">
        <p>CATEGORIES</p>
        <form className="card__filer-content">
          {
                 uniqueCategories.map((element) => (
                   <div key={element.id} className="card__filer-content-element">
                     <label htmlFor={element.nom}>{element.nom}</label>
                     <input
                       onChange={handleClickCheckbox}
                       type="checkbox"
                       id={element.nom}
                       name="category"
                       value={element.nom.toLowerCase()}
                       checked={activeCategories.includes(element.nom.toLowerCase())}
                     />
                   </div>
                 ))
          }
        </form>
      </div>

      <div className="card__filer">
        <p>TOTAL EFFECTIF</p>
        <form className="card__filer-content">
          <div className="card__filer-content-element">
            <label htmlFor="10">0 - 10</label>
            <input onChange={handleClickCheckbox} type="checkbox" id="10" name="totalEffectif" value="10" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="10-40">10 - 40</label>
            <input onChange={handleClickCheckbox} type="checkbox" id="10-40" name="totalEffectif" value="10-40" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="+40">+40</label>
            <input onChange={handleClickCheckbox} type="checkbox" id="+40" name="totalEffectif" value="+40" />
          </div>
        </form>
      </div>
    </div>

  );
}

export default Filter;
