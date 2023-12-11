import moment from 'moment';
// import 'moment/locale/fr';

const functionConverteDate = {
  convertDateToDelay: (derniere_activite: string | number) => {
    const lastActivity = moment(derniere_activite);
    const now = moment();

    const minutesElapsed = now.diff(lastActivity, 'minutes');
    return minutesElapsed;
  },
  convertDate: (derniere_activite: string | number) => {
    const date = moment(derniere_activite).format('MM-DD-YYYY hh:mm:ss');

    return date;
  },
  convertDatee: (derniere_activite: string | number) => {
    moment.locale('fr');
    const date = moment(derniere_activite).locale('fr').format('D MMMM YYYY');

    return date;
  },
};
export default functionConverteDate;
