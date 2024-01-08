/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, createReducer } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../utils/axios';

interface QRCodeState {
  data: { seanceId: number; joueurId: number } | null;
}

const initialState: QRCodeState = {
  data: null,
};
export const setQRCodeData = createAction<{ seanceId: number; joueurId: number }>('qrCode/setData');
export const updateLastActivityAndManagePresence = createAppAsyncThunk(
  'qrCode/updateLastActivityAndManagePresence',
  async ({
    seanceId,
    joueurId,
    statut,
    absence,
    retard,
  }: {
    seanceId: number;
    joueurId: number ;
    statut:string;
    absence:string;
    retard:string; }, thunkAPI) => {
    // Mettre à jour derniere_activite
    await axiosInstance.post(`/update-last-activity/${joueurId}`);
    // Gérer la présence
    await axiosInstance.post(`/presences/${joueurId}/${seanceId}`, {
      seanceId,
      joueurId,
      statut,
      absence,
      retard,
    });
  },
);
const qrCodeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setQRCodeData, (state, action) => {
      state.data = action.payload;
    })
    .addCase(updateLastActivityAndManagePresence.rejected, (state, action) => {
      state.error = action.error.message;
    });
});

export default qrCodeReducer;
