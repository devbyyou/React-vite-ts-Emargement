import React, { useState } from 'react';
import BanniereMessage from './BanniereMessage';
import ListPresents from './LIstPresents';
import Calendrier from './Calendrier';
import './index.scss';

function Presents() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="content__page-presents">
      <BanniereMessage />
      <ListPresents selectedDate={selectedDate} />
      <Calendrier
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}

export default Presents;
