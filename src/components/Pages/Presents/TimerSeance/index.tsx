import Countdown from 'react-countdown';
import React from 'react';
import './index.scss';

interface Itarget {
  laseance :Date
}

function TimerSeance({ laseance } :Itarget) {
  if (!(laseance instanceof Date)) {
    return (
      <div className="listPresents__timer red">
        <span> Choisi ta date et une equipe </span>
      </div>
    );
  }
  // astuce provisoire pour tester le chrono à enlever en prod
  // const now :any = () => {
  //   const currentDate = new Date();
  //   currentDate.setFullYear(laseance.getFullYear());
  //   currentDate.setMonth(laseance.getMonth());
  //   currentDate.setDate(laseance.getDate());
  //   return currentDate;
  // };
  // console.log(laseance);

  return (
    <div className="listPresents__timer green">
      <Countdown
        date={laseance}
        // now={now}
        renderer={({
          hours, minutes, seconds, completed,
        }) => (
          <span>
            {completed ? 'La séance a debuté  !' : `Début du prochaine entrainement dans : ${hours}:${minutes}:${seconds}`}
          </span>
        )}
      />

    </div>
  );
}

export default TimerSeance;
