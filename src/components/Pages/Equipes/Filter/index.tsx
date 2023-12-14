import React, {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';
import './index.scss';
import { useAppSelector } from '../../../../hooks/redux';
import { Equipe } from '../../../../@types/user';

interface IsetfilteredByCheckbox {
  setfilteredByCheckbox: React.Dispatch<React.SetStateAction<Equipe[]>>;
}

function Filter({ setfilteredByCheckbox }: IsetfilteredByCheckbox) {
  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;
  const categories = equipes.map((listeEquipes) => listeEquipes.categories);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const prevFilteredByCategory = useRef<Equipe[]>(equipes);
  // Utilisez un tableau pour suivre les catégories actives

  // astuce pour ne pas répéter plusieurs fois la même catégorie
  // Utilisons un ensemble pour suivre les clés déjà rencontrées
  const seenKeys = new Set();
  // Filtrons les catégories pour ne montrer que celles avec des clés uniques
  const uniqueCategories = categories.filter((category) => {
    const isUnique = !seenKeys.has(category.id);
    seenKeys.add(category.id);
    return isUnique;
  });

  function handleClickCheckbox(event: ChangeEvent<HTMLInputElement>): void {
    const checkboxValue = event.target.value;

    if (activeCategories.includes(checkboxValue)) {
      // Si la catégorie est déjà active, la retire du tableau
      setActiveCategories(activeCategories.filter((category) => category !== checkboxValue));
    } else {
      // Si la catégorie n'est pas active, l'ajoute au tableau
      setActiveCategories([...activeCategories, checkboxValue]);
    }
  }
  const filteredByCategory = equipes.filter((element) => (
    activeCategories.includes(element.categories.nom.toLowerCase())
  ));
  // Mise à jour du filtre
  useEffect(() => {
    if (filteredByCategory.length !== prevFilteredByCategory.current.length) {
      setfilteredByCheckbox(filteredByCategory);
      prevFilteredByCategory.current = filteredByCategory;
    }
  }, [filteredByCategory, setfilteredByCheckbox]);
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
            <label htmlFor="0-20">0 - 10</label>
            <input type="checkbox" id="0-20" name="totalEffectif" value="0-20" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="20-40">10 - 40</label>
            <input type="checkbox" id="20-40" name="totalEffectif" value="20-40" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="40plus">+40</label>
            <input type="checkbox" id="40plus" name="totalEffectif" value="40plus" />
          </div>
        </form>
      </div>
    </div>

  );
}

export default Filter;
