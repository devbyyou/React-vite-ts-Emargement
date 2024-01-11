import React from 'react';
import Calendar from 'react-calendar';
import './index.scss';
import { Value } from 'react-calendar/dist/cjs/shared/types';

interface Istate {
  selectedDate: Value,
  setSelectedDate : React.Dispatch<React.SetStateAction<Value>>;
}

function Calendrier({ selectedDate, setSelectedDate }:Istate) {
  const handleDateChange = (value: Value) => {
    // Check if the value is a Date
    if (value instanceof Date) {
      // Set the time part of the selected date to the current time
      const currentTime = new Date();
      value.setHours(currentTime.getHours());
      value.setMinutes(currentTime.getMinutes());
      value.setSeconds(currentTime.getSeconds());

      // console.log(value);
      setSelectedDate(value);
    }
  };
  return (
    <div className="calendrier-container">
      <h2>Calendrier :</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}

      />
    </div>
  );
}
export default Calendrier;
