import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Header from '../Home/Header';
import logo from '../../../assets/devbyou.png';

function Joueur() {
  return (
    <div>
      <Header />
      <div className="joueur__banniere">
        <img src={logo} alt="" />
        <h1>Robbert Pirès</h1>
      </div>
      <div className="cts">
        <div className="joueur__content">

          <div className="joueur__informations">
            <div className="joueur__informations-title">
              <h3>Information Personnelles</h3>
              <button className="colorRed" type="button">Supprimer</button>
              <button type="button">Modifier photo</button>
              <button type="button">Modifier les informations</button>
            </div>

            <div className="block-content">
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Created:</div>
                <div className="col-md-8">2023-02-12</div>
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Status:</div>
                <div className="col-md-8"><span className="badge rounded-pill bg-primary">Active</span></div>
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Email:</div>
                <div className="col-md-8" />
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Home phone:</div>
                <div className="col-md-8" />
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Mobile phone:</div>
                <div className="col-md-8" />
              </div>
              <div className="joueur__informations-row mb-2">
                <div className="col-md-4">Password:</div>
                <div className="col-md-8">
                  <Link to="/">Click here to change cedric de password</Link>
                </div>
              </div>
              <div className="joueur__informations-row mb-3">
                <div className="col-md-4">Bio/Note:</div>
                <div className="col-md-8" />
              </div>
            </div>

          </div>

          <div className="timeline-event-block block">
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
          </div>

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
                    <th>Classe</th>
                    <th>Présence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2023-11-09</td>
                    <td><a href="https://www.myattendancetracker.com/class/view/imMoozZzFcpCDL7rXWVScRXZXHOJmP">club</a></td>
                    <td><span>Absent</span></td>
                  </tr>
                  <tr>
                    <td>2023-02-12</td>
                    <td><a href="https://www.myattendancetracker.com/class/view/imMoozZzFcpCDL7rXWVScRXZXHOJmP">club</a></td>
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
              Club
              <button type="button"> Modifier</button>
            </h3>
            <p>
              Club
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
