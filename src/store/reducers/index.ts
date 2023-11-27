import coachesReducer from './coaches';
import equipesReducer from './equipes';
import categoriesReducer from './categories';
import joueursReducer from './joueurs';
import userReducer from './user';
import inscriptionReducer from './inscription';
import qrCodeReducer from './qrCode';

const reducer = {
  coaches: coachesReducer,
  equipes: equipesReducer,
  categories: categoriesReducer,
  joueurs: joueursReducer,
  user: userReducer,
  inscription: inscriptionReducer,
  qrCode: qrCodeReducer,
};

export default reducer;
