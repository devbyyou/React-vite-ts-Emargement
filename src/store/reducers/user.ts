import { createAction, createReducer } from '@reduxjs/toolkit';

interface UserState {
  logged:boolean;
  credentials: {
    email: string
    password: string
  },
}

export const initialState: UserState = {
  logged: false,
  credentials: {
    email: 'jean.dupont@email.com',
    password: 'hashed_password',
  },

};
export const changeCredentialsField = createAction<{
  value:string;
  field: keyof UserState['credentials']
}>('user/CHANGE_CREDENTIALS_FIELD');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    });
});
export default userReducer;
