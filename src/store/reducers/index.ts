import coachesReducer from './coaches';
import ApiReducer from './api';
import equipesReducer from './equipes';
import categoriesReducer from './categories';
import joueursReducer from './joueurs';
import userReducer from './user';
import inscriptionReducer from './inscription';
import qrCodeReducer from './qrCode';
import seanceReducer from './seance';
import attendanceReducer from './graph';

const reducer = {
  coaches: coachesReducer,
  equipes: equipesReducer,
  categories: categoriesReducer,
  joueurs: joueursReducer,
  user: userReducer,
  inscription: inscriptionReducer,
  qrCode: qrCodeReducer,
  api: ApiReducer,
  seance: seanceReducer,
  graph: attendanceReducer,
};

export default reducer;
