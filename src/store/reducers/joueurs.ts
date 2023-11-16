import { createReducer } from '@reduxjs/toolkit';
import { joueurs } from '../../data/data2.json';
import { Joueur } from '../../@types/types2';

interface JoueursState {
  joueurs: Joueur[]
}

const initialState: JoueursState = {
  joueurs,
};

// console.log(joueurs);

const joueursReducer = createReducer(initialState, () => {

});

export default joueursReducer;
