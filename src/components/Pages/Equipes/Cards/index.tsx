import React from 'react';
import './index.scss';
import { RiTeamLine } from 'react-icons/ri';
import { CgMoreVerticalO } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/devbyou.png';

function Cards() {
  return (
    <div className="content__equipe__contenu-card">
      <p>125 résultas</p>
      <div className="cards__containers">
        <Link to="/equipes/senior" className="cards__containers-card">
          <div className="cards__containers-logo-name-logo">
            <div className="cards__containers-logo-name">
              <img className="cards__containers-logo" src={logo} alt="" />
              <div className="name">Senior</div>
            </div>
            <CgMoreVerticalO className="logoMore" />
          </div>
          <div className="info">
            <RiTeamLine />
            <div className="count">96</div>
          </div>
        </Link>

        <div className="cards__containers-card">
          <div className="cards__containers-logo-name-logo">

            <div className="cards__containers-logo-name">
              <img className="cards__containers-logo" src={logo} alt="" />
              <div className="name">Senior</div>
            </div>
            <CgMoreVerticalO className="logoMore" />
          </div>

          <div className="info">
            <RiTeamLine />
            <div className="count">96</div>
          </div>

        </div>
        <div className="cards__containers-card">
          <div className="cards__containers-logo-name-logo">

            <div className="cards__containers-logo-name">
              <img className="cards__containers-logo" src={logo} alt="" />
              <div className="name">Senior</div>
            </div>
            <CgMoreVerticalO className="logoMore" />
          </div>

          <div className="info">
            <RiTeamLine />
            <div className="count">96</div>
          </div>

        </div>
        <div className="cards__containers-card">
          <div className="cards__containers-logo-name-logo">

            <div className="cards__containers-logo-name">
              <img className="cards__containers-logo" src={logo} alt="" />
              <div className="name">Senior</div>
            </div>
            <CgMoreVerticalO className="logoMore" />
          </div>

          <div className="info">
            <RiTeamLine />
            <div className="count">96</div>
          </div>

        </div>
        <div className="cards__containers-card">
          <div className="cards__containers-logo-name-logo">

            <div className="cards__containers-logo-name">
              <img className="cards__containers-logo" src={logo} alt="" />
              <div className="name">Senior</div>
            </div>
            <CgMoreVerticalO className="logoMore" />
          </div>

          <div className="info">
            <RiTeamLine />
            <div className="count">96</div>
          </div>

        </div>
        <div className="cards__containers-card">
          <div className="cards__containers-logo-name-logo">

            <div className="cards__containers-logo-name">
              <img className="cards__containers-logo" src={logo} alt="" />
              <div className="name">Senior</div>
            </div>
            <CgMoreVerticalO className="logoMore" />
          </div>

          <div className="info">
            <RiTeamLine />
            <div className="count">96</div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Cards;
