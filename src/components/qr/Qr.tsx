import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

function Qr() {

    const [scanResult, setScanResult] = useState('');

    // Если понадобится отключение выбора камеры при старте сканирования
    // ВОзможно стоит поискать нормальные решения
    // useEffect(() => {
    //     const scannerMobile = new Html5QrcodeScanner('reader', {
    //         qrbox: {
    //             width: 250,
    //             height: 250,
    //         },
    //         fps: 20,
    //         // supportedScanTypes: [
    //         //     Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    //         videoConstraints: {
    //             facingMode: {exact: "environment"},
    //         },
    //     }, undefined);
    //
    //     const scannerDesctop = new Html5QrcodeScanner('reader', {
    //         qrbox: {
    //             width: 250,
    //             height: 250,
    //         },
    //         fps: 20,
    //     }, undefined);
    //
    //     async function getMedia() {
    //         try {
    //             return await navigator.mediaDevices.getUserMedia();
    //             /* use the stream */
    //         } catch (err) {
    //             /* handle the error */
    //         }
    //     }
    //
    //     getMedia().then((response) => {
    //         if (response) {
    //             scannerMobile.render(success, error)
    //         } else {
    //             scannerDesctop.render(success, error)
    //         }
    //     })
    //
    //
    //     function success(result: string) {
    //         setScanResult(result);
    //         scannerMobile.clear();
    //     }
    //
    //     function error() {
    //         console.log('error');
    //     }
    // }, []);

    useEffect(() => {
        const scannerMobile = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 20,
        }, undefined);

        scannerMobile.render(success, error)

        function success(result: string) {
            setScanResult(result);
            scannerMobile.clear();
        }

        function error() {
            console.log('error');
        }
    }, []);

    return (
        <>
            <div id="reader" style={{maxWidth: 600}}></div>
            {scanResult}
        </>
    );
}

export default Qr;
