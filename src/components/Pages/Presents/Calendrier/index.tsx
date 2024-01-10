import React, { MouseEvent, useState } from 'react';
import Calendar from 'react-calendar';
import './index.scss';
import { Value } from 'react-calendar/dist/cjs/shared/types';

interface Istate {
  selectedDate:string,
  setSelectedDate : () => void
}

function Calendrier({ selectedDate, setSelectedDate }:Istate) {
  const handleDateChange = (value: Value, event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedDate(value);
  };
  return (
    <div className="calendrier-container">
      Calendrier:
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}
export default Calendrier;
