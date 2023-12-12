import { createAction, createReducer } from '@reduxjs/toolkit';
// import { equipes } from '../../data/data2.json';
import { Equipe } from '../../@types/user';
// import { Equipe } from '../../@types/types2';

interface EquipesState {
  equipes: Equipe[]
}

const initialState: EquipesState = {
  equipes: [],
};

export const updateequipes = createAction('equipes/UPDATE_EQUIPES');

const equipeReducer = createReducer(initialState, (builder) => {
  // builder;
  // .addCase(updateequipes, (state, action) => {
  //   state.equipes = action.payload;
  // });
});
export default equipeReducer;
