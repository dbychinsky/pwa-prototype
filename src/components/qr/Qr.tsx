import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

function Qr() {

    const [scanResult, setScanResult] = useState('');

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 20,
            // supportedScanTypes: [
            //     Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            videoConstraints: {
                facingMode: {exact: "environment"},
            },
        }, undefined);

        scanner.render(success, error)

        function success(result: string) {
            setScanResult(result);
            scanner.clear();
        }

        function error() {
            console.log('error');
        }
    }, []);

    return (
        <>
            <div id="reader" style={{width: 600}}></div>
            {scanResult}
        </>
    );
}

export default Qr;
