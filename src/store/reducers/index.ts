import coachesReducer from './coaches';
import equipesReducer from './equipes';
import categoriesReducer from './categories';
import joueursReducer from './joueurs';

const reducer = {
  coaches: coachesReducer,
  equipes: equipesReducer,
  categories: categoriesReducer,
  joueurs: joueursReducer,
};

export default reducer;
