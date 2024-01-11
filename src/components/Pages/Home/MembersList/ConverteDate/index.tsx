import moment from 'moment';
import { format, addHours } from 'date-fns';

// import 'moment/locale/fr';

const functionConverteDate = {
  convertDateToDelay: (derniere_activite: string | number) => {
    const lastActivity = moment(derniere_activite);
    const now = moment();

    const minutesElapsed = now.diff(lastActivity, 'minutes');
    return minutesElapsed;
  },
  chronoTime: (derniere_activite: string | number) => {
    const date = moment(derniere_activite).format('MM-DD-YYYY hh:mm:ss');

    return date;
  },
  heureTime: (derniere_activite: string | number) => {
    const date = moment(derniere_activite).format('HH:mm:ss');

    return date;
  },
  calendaraDate: (derniere_activite: string | number) => {
    moment.locale('fr');
    const date = moment(derniere_activite).locale('fr').format('D MMMM YYYY');

    return date;
  },
  heureHiver: (originalDateString :string, timeZoneOffset:number, formatString:string) => {
    // Parse the original date string
    const originalDate = new Date(originalDateString);

    // Adjust the date based on the provided timeZoneOffset
    const adjustedDate = addHours(originalDate, timeZoneOffset);

    // Format the adjusted date using the provided formatString
    const formattedDate = format(adjustedDate, formatString);

    return formattedDate;
  },
};
export default functionConverteDate;
