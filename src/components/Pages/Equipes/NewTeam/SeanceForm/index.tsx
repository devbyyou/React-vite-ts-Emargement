/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { useParams } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { changeCredentialsField, addSeance } from '../../../../../store/reducers/seance';

function SeanceForm() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const equipes = useAppSelector((state) => state.equipes.equipes);

  const {
    equipe_id, categorie_id, statut, adresse, ville,
  } = useAppSelector((state) => state.seance.credentials);

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleChangeInput = (field: 'equipe_id' | 'categorie_id' | 'statut' | 'adresse' | 'ville' | 'day' | 'time') => (event: ChangeEvent<HTMLInputElement> | any) => {
    const { value } = event.target;
    if (field === 'day') {
      setSelectedDay(value);
    } else if (field === 'time') {
      setSelectedTime(parseISO(`2024-01-01T${value}`));
    } else {
      dispatch(changeCredentialsField({
        value,
        field,
      }));
    }
  };

  const generateRecurringDates = (selectedDay: string, selectedTime: Date) => {
    const recurringDate = [];

    // Utiliser date-fns pour obtenir la prochaine occurrence du jour sélectionné
    const currentDate = new Date();
    const nextDayDate = addDays(currentDate, (daysOfWeek.indexOf(selectedDay) - currentDate.getDay() + 7) % 7);
    nextDayDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());

    recurringDate.push(nextDayDate);

    return recurringDate;
  };

  const AddSeanceSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Générer les dates des séances récurrentes
    const recurringDates = generateRecurringDates(selectedDay, selectedTime);

    // Envoyer les données au backend
    await dispatch(addSeance({
      equipe_id,
      categorie_id,
      statut,
      adresse,
      ville,
      recurringDates,
    }));

    // Réinitialiser les champs après l'ajout de la séance
    setSelectedDay('');
    setSelectedTime(new Date());
  };

  return (
    <form onSubmit={AddSeanceSubmitForm} action="submit" className="my-form newteam">
      <h2>Nouvelle Séance</h2>

      <div className="newplayerField">
        <label>
          Adresse
          <input name="Adresse" onChange={handleChangeInput('adresse')} value={adresse} type="text" />
        </label>
        <label>
          Ville
          <input name="ville" onChange={handleChangeInput('ville')} value={ville} type="text" />
        </label>
      </div>

      <div className="newteam__content__card--categorie">
        <p>CATEGORIES</p>
        <div className="newteam__content__card--categorie--label">
          {categories.map((categorie) => (
            <label key={categorie.id}>
              {categorie.nom}
              <input name="categorie_id" onChange={handleChangeInput('categorie_id')} value={parseInt(categorie.id, 10)} type="radio" />
            </label>
          ))}
        </div>
      </div>

      <div className="newteam__content__card--categorie">
        <p>Equipes :</p>
        <div className="newteam__content__card--categorie--label">
          {equipes.map((equip) => (
            <label key={equip.id}>
              {equip.nom}
              <input name="equipe_id" onChange={handleChangeInput('equipe_id')} value={equip.id} type="radio" />
            </label>
          ))}
        </div>
      </div>

      <div className="newplayerField">
        <label>
          Jour de la semaine
          <select name="day" onChange={handleChangeInput('day')} value={selectedDay}>
            <option value="">Sélectionnez le jour</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <label>
          Heure
          <input name="time" onChange={handleChangeInput('time')} value={format(selectedTime, 'HH:mm')} type="time" />
        </label>
      </div>

      <div className="my-form--button">
        <button type="submit">Valider</button>
      </div>
    </form>
  );
}

export default SeanceForm;
