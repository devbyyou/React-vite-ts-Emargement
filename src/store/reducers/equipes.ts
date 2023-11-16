import { createReducer } from '@reduxjs/toolkit';
import { equipes } from '../../data/data2.json';
import { Equipe } from '../../@types/types2';

interface EquipesState {
  equipes: Equipe[]
}

const initialState: EquipesState = {
  equipes,
};

// console.log(equipes);

const equipeReducer = createReducer(initialState, () => {

});
export default equipeReducer;
