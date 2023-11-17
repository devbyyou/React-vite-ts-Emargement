import { createReducer } from '@reduxjs/toolkit';
import { coaches } from '../../data/data2.json';
import { Coach } from '../../@types/types2';

interface CoachesState {
  coaches: Coach[]
}

const initialState: CoachesState = {
  coaches,
};

// export const monActionAvecParams = createAction('MON_ACTION_AVEC_PARAMS');

const coachesReducer = createReducer(initialState, () => {
  // builder;
  // .addCase(monActionAvecParams, (state, action) => {
  // // Je récupère le paramètre passer dans mon action lors du dispatch
  // // Cette information se retrouve dans `action.payload`
  //   state.yeah = action.payload;
  // });
});
export default coachesReducer;
