import React from 'react';
import './index.scss';
import functionConverteDate from '../../Home/MembersList/ConverteDate';

interface IselectDate {
  selectedDate :string
}
function BanniereMessage({ selectedDate }:IselectDate) {
  return (
    <div className="BanniereMessage">
      <h1>Tableau de bord des présences</h1>
      <p>
        Présence du :
      </p>
      <div>
        {functionConverteDate.calendaraDate(selectedDate)}
        {' '}
      </div>
    </div>
  );
}

export default BanniereMessage;
