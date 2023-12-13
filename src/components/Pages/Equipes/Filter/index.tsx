import React from 'react';
import './index.scss';
import { useAppSelector } from '../../../../hooks/redux';

function Filter() {
  const user = useAppSelector((state) => state.user.token.user);
  const { equipes } = user;
  // const { categories } = equipes;
  const categories = equipes.map((listeEquipes) => listeEquipes.categories);
  // console.log(categories);
  // astuce pour ne pas répéter plusieurs fois la même catégories
  // Utilisons un ensemble pour suivre les clés déjà rencontrées
  const seenKeys = new Set();
  // Filtrons les catégories pour ne montrer que celles avec des clés uniques
  const uniqueCategories = categories.filter((category) => {
    const isUnique = !seenKeys.has(category.id);
    seenKeys.add(category.id);
    return isUnique;
  });

  return (
    <div className="filter">
      <h2>Filtrer par</h2>

      <div className="card__filer">
        <p>CATEGORIES</p>
        <form className="card__filer-content">
          {
                 uniqueCategories.map((element) => (
                   <div key={element.id} className="card__filer-content-element">
                     <label htmlFor="cdm">{element.nom}</label>
                     <input type="checkbox" id="cdm" name="category" value="cdm" />
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
