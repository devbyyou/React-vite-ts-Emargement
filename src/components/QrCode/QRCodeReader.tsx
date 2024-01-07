/* eslint-disable @typescript-eslint/naming-convention */
// QRCodeReader.tsx
import React from 'react';
import { QrReader } from 'react-qr-reader';
// import { useDispatch } from 'react-redux';
import { setQRCodeData, updateLastActivityAndManagePresence } from '../../store/reducers/qrCode';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Header from '../Pages/Home/Header';
import './index.scss';
import functionConverteDate from '../Pages/Home/MembersList/ConverteDate';
import store from '../../store';

function QRCodeReader() {
  const token = useAppSelector((state) => state.user.token);
  const { joueur, user } = token;
  const dispatch = useAppDispatch();

  const handleScan = (data: string | null) => {
    console.log('Handling Scan with data:', data);

    if (data) {
      try {
        const { seanceId, equipe_id } = JSON.parse(data);
        console.log('Parsed QR Code Data:', { seanceId, equipe_id });

        console.log('joueur.id:', joueur.id);
        console.log('seanceId:', seanceId);

        dispatch(setQRCodeData({ seance_id: seanceId, equipe_id }));
        dispatch(updateLastActivityAndManagePresence({ seanceId, joueurId: joueur.id }));
      } catch (error) {
        console.error('Error parsing QR Code data:', error);
      }
    }
  };

  console.log(functionConverteDate.calendaraDate(joueur.derniere_activite));
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
