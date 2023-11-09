import { FcPlanner } from 'react-icons/fc';

import './index.scss';
import { BiSolidChevronRight } from 'react-icons/bi';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ListChoice() {
  return (
    <div className="listChoice">
      <h2>Accès rapide</h2>
      <div className="listChoice__card">
        <FcPlanner className="plannerLogo" />
        <Link to="/presents" className="listChoice__card-content">
          <p>Gérer vos séances</p>
          <div className="listChoice__card-items">
            <span>Tableau de bord</span>
          </div>
        </Link>
        <BiSolidChevronRight className="chevronLogo" />
      </div>

      <div className="listChoice__card">
        <FaRegEdit className="editLogo" />
        <Link to="/equipes" className="listChoice__card-content">
          <p>Modifier vos joueurs</p>
          <div className="listChoice__card-items">
            <span>Centre joueurs</span>
          </div>
        </Link>
        <BiSolidChevronRight className="chevronLogo" />
      </div>
    </div>
  );
}

export default ListChoice;
