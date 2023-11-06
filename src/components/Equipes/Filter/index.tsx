import React from 'react';
import './index.scss';

function Filter() {
  return (
    <div className="filter">
      <h2>Filtrer par</h2>
      <div className="card__filer">
        <p>CATEGORIES</p>
        <form className="card__filer-content">
          <div className="card__filer-content-element">
            <label htmlFor="cdm">CDM</label>
            <input type="radio" id="cdm" name="cdm" value="cdm" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="senior">Sénior</label>
            <input type="radio" id="senior" name="senior" value="senior" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="u20">U20</label>
            <input type="radio" id="u20" name="u20" value="u20" />
          </div>
        </form>
      </div>

      <div className="card__filer">
        <p>TOTAL EFFECTIF</p>
        <form className="card__filer-content">
          <div className="card__filer-content-element">
            <label htmlFor="cdm">0 - 20</label>
            <input type="radio" id="cdm" name="cdm" value="cdm" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="senior">20 - 40</label>
            <input type="radio" id="senior" name="senior" value="senior" />
          </div>
          <div className="card__filer-content-element">
            <label htmlFor="u20">+40</label>
            <input type="radio" id="u20" name="u20" value="u20" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
