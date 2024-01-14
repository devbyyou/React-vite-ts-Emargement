/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
// QRCodeReader.tsx
import React from 'react';
import { QrReader } from 'react-qr-reader';
import { setQRCodeData, updateLastActivityAndManagePresence } from '../../store/reducers/qrCode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Header from '../Pages/Home/Header';
import './index.scss';

function QRCodeReader() {
  const token = useAppSelector((state) => state.user.token);
  const { joueur } = token;
  const dispatch = useAppDispatch();
  const handleScan = (data: string | null) => {
    console.log('Handling Scan with data:', data);
    if (data) {
      const {
        seanceId, equipe_id, horaire,
      } = JSON.parse(data);
      const now = new Date();
      now.setSeconds(0);
      now.setMilliseconds(0);
      // const crenau = new Date(horaire);
      const horaireParis = new Date(horaire);
      const horaireLocal = new Date(horaireParis.setHours(horaireParis.getHours() + 1));
      horaireLocal.setMilliseconds(0);
      horaireLocal.setSeconds(0);
      try {
        // A prevoir :
        // --- : Possibilité de scanné le qr seleument une fois et que 30min avant la seance et 3h plus tard uniquement Pour ajouter un délais d'expiration au qr et eviter des value étrange
        // --- : Ajouter 30min minutes à ${heure} pour éviter de mettre le joueur absent alors qu'il est en avance
        if (now > horaireLocal) {
          const statut = '--';
          const absence = '--';
          const retard = 'RETARD';
          dispatch(updateLastActivityAndManagePresence({
            seanceId,
            joueurId: joueur.id,
            statut,
            absence,
            retard,
          }));
        } else if (now < horaireLocal) {
          const statut = '--';
          const absence = 'ABSENT';
          const retard = '--';
          dispatch(updateLastActivityAndManagePresence({
            seanceId,
            joueurId: joueur.id,
            statut,
            absence,
            retard,
          }));
        } else {
          const statut = 'PRESENT';
          const absence = '--';
          const retard = '--';
          dispatch(updateLastActivityAndManagePresence({
            seanceId,
            joueurId: joueur.id,
            statut,
            absence,
            retard,
          }));
        }
        dispatch(setQRCodeData({ seance_id: seanceId, equipe_id }));
      } catch (error) {
        console.error('Error parsing QR Code data:', error);
      }
    }
  };
  return (
    <div className="content__qr">
      <Header />
      <header className="parametre__content-header">
        <h2>QR Code Reader</h2>
        <p>D&apos;ici, tu peut scanner ton QRcode </p>
      </header>
      <QrReader
        scanDelay={300}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onResult={handleScan}
        // style={{ width: '90%' }}
        className="qrCode__reader"
      />

    </div>
  );
}

export default QRCodeReader;
