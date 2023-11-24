import { createAction, createReducer } from '@reduxjs/toolkit';

export const setQRCodeData = createAction<string>('qrCode/setData');

interface QRCodeState {
  data: string | null;
}

const initialState: QRCodeState = {
  data: null,
};

const qrCodeReducer = createReducer(initialState, (builder) => {
  builder.addCase(setQRCodeData, (state, action) => {
    state.data = action.payload;
  });
});

export default qrCodeReducer;
