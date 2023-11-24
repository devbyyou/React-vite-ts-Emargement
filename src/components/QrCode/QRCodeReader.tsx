// QRCodeReader.tsx
import React from 'react';
import { QrReader } from 'react-qr-reader';
// import { useDispatch } from 'react-redux';
import { setQRCodeData } from '../../store/reducers/qrCode';
import { useAppDispatch } from '../../hooks/redux';

function QRCodeReader() {
  const dispatch = useAppDispatch();

  const handleScan = (data: string | null) => {
    if (data) {
      dispatch(setQRCodeData(data));
    }
  };

  return (
    <div>
      <h2>QR Code Reader</h2>
      <QrReader
        scanDelay={300}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onResult={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default QRCodeReader;
