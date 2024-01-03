// QRCodeReader.tsx
import React from 'react';
import { QrReader } from 'react-qr-reader';
// import { useDispatch } from 'react-redux';
import { setQRCodeData } from '../../store/reducers/qrCode';
import { useAppDispatch } from '../../hooks/redux';
import Header from '../Pages/Home/Header';
import './index.scss';

function QRCodeReader() {
  const dispatch = useAppDispatch();

  const handleScan = (data: string | null) => {
    if (data) {
      dispatch(setQRCodeData(data));
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
