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
export const setQRCodeData = createAction<{
  seanceId: number | any ;
  joueurId: number | any ;
  seance_id:number | any ;
  equipe_id:number | any ;
}>('qrCode/setData');
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
    await axiosInstance.post(`/update-last-activity/${joueurId}`);
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
    .addCase(updateLastActivityAndManagePresence.fulfilled, (state, action) => {
      alert('Le QrCode à bien été validé ! ');
    })
    .addCase(updateLastActivityAndManagePresence.pending, () => {
      alert('Scanning en cours... Veuillez patienter');
    });
});

export default qrCodeReducer;
