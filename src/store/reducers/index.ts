import coachesReducer from './coaches';
import equipesReducer from './equipes';
import categoriesReducer from './categories';
import joueursReducer from './joueurs';
import userReducer from './user';

const reducer = {
  coaches: coachesReducer,
  equipes: equipesReducer,
  categories: categoriesReducer,
  joueurs: joueursReducer,
  user: userReducer,
};

export default reducer;
