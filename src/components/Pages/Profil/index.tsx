import React from 'react';
import './index.scss';

function Profil() {
  return (
    <div className="profil__content">
      <div className="profil__banniere">
        <img src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=1623&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="profil__banniere-dec">
          <p>Robbert Pirès</p>
          <div className="profil__banniere-dec-btn">
            <button type="button">Modifier mon profil</button>
          </div>
        </div>
      </div>
      <img className="profil__banniere-logo" src="https://miro.medium.com/v2/resize:fill:96:96/1*yWfoK01BZFKO6fFQyzxJSA.jpeg" alt="" />
      <div className="profil__informations">
        <h3>Informations</h3>
        <p>Inscrit le 22 février 2022 14:23</p>
        <p>Derniere activité le 9 novembre 2023 15:08</p>
      </div>
    </div>
  );
}

export default Profil;
