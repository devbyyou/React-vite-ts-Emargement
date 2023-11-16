import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
// import colorReducer from './reducers/color';

// Je créer mon store qui va contenir toutes mes données
const store = configureStore({
  // Ma propriété reducer va contenir tous mes reducers...
  reducer,
});

export default store;

// Je déduis le type `RootState` et `AppDispatch` depuis le store lui même
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
