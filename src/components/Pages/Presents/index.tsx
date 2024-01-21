/* eslint-disable max-len */
import React, { useState } from 'react';
import BanniereMessage from './BanniereMessage';
import ListPresents from './LIstPresents';
import Calendrier from './Calendrier';
import './index.scss';
import TimerSeance from './TimerSeance';
import { Seances } from '../../../@types/user';

function Presents() {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [statefilteredByEquipe, setStatefilteredByEquipe] = useState<Seances[]>([]);
  const findSeances = statefilteredByEquipe.map((seances) => seances.horaire);
  const seanceTrouve = findSeances.map((horaires) => horaires);
  const seances = seanceTrouve.map((seance) => seance);
  const tab: any = [];
  seances.map((seanc) => tab.push(new Date(seanc)));
  const laseance = tab[0];
  // console.log(laseance);

  return (
    <div className="content__page-presents">
      <BanniereMessage selectedDate={selectedDate} />
      <TimerSeance laseance={laseance} />
      <ListPresents
        setStatefilteredByEquipe={setStatefilteredByEquipe}
        selectedDate={selectedDate}
        statefilteredByEquipe={statefilteredByEquipe}
      />
      <Calendrier
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}

export default Presents;
