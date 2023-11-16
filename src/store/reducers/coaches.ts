import { createReducer } from '@reduxjs/toolkit';
import { coaches } from '../../data/data2.json';
import { Coach } from '../../@types/types2';

interface CoachesState {
  coaches: Coach[]
}

const initialState: CoachesState = {
  coaches,
};

const coachesReducer = createReducer(initialState, () => {

});
export default coachesReducer;
