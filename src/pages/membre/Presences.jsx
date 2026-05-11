import { useState, useEffect, useRef } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { QrCode, CheckCircle, AlertCircle } from 'lucide-react';

export default function Presences() {
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [loading, setLoading] = useState(false);
    const scannerRef = useRef(null);

    useEffect(() => {
        // Initialize scanner
        const scanner = new Html5QrcodeScanner(
            "reader",
            { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
            },
            /* verbose= */ false
        );

        scannerRef.current = scanner;

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(error => {
                    console.error("Failed to clear html5QrcodeScanner. ", error);
                });
            }
        };
    }, []);

    const onScanSuccess = async (decodedText) => {
        if (loading) return; // Prevent multiple requests

        // Stop scanning temporarily
        if (scannerRef.current) {
            scannerRef.current.pause();
        }

        setLoading(true);
        setScanError(null);
        setScanResult(null);

        try {
            // decodedText should be the token or the full URL containing the token
            // If it's a URL, extract the token
            let token = decodedText;
            if (token.includes('/')) {
                const parts = token.split('/');
                token = parts[parts.length - 1];
            }

            const response = await axios.get(`/qrcodes/scanner/${token}`);
            setScanResult(response.data.message || "Présence enregistrée avec succès ! +10 points.");
        } catch (err) {
            setScanError(err.response?.data?.message || "Erreur lors de l'enregistrement de la présence. QR code invalide ou expiré.");
        } finally {
            setLoading(false);
            // Resume scanning after 3 seconds
            setTimeout(() => {
                if (scannerRef.current) {
                    scannerRef.current.resume();
                }
            }, 3000);
        }
    };

    const onScanFailure = (error) => {
        // Handle scan failure, usually just ignore it as it happens continuously when no QR code is in view
    };

    return (
        <DashboardLayout title="Présences">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Scanner un QR Code</h1>
                    <p className="text-slate-400">Scannez le QR code de l'événement pour valider votre présence et gagner des points.</p>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5 shadow-sm overflow-hidden">
                    <div id="reader" className="w-full rounded-lg overflow-hidden border-2 border-indigo-100"></div>
                </div>

                {loading && (
                    <div className="bg-blue-500/10 text-blue-600 p-4 rounded-xl border border-blue-200 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                        Validation de la présence en cours...
                    </div>
                )}

                {scanResult && (
                    <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl border border-emerald-500/20 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                        <p className="font-medium">{scanResult}</p>
                    </div>
                )}

                {scanError && (
                    <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl border border-rose-500/20 flex items-center">
                        <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                        <p className="font-medium">{scanError}</p>
                    </div>
                )}

                <div className="bg-indigo-500/10 rounded-xl p-4 flex items-start">
                    <QrCode className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-indigo-900">Comment ça marche ?</h4>
                        <p className="text-sm text-indigo-400 mt-1">
                            Autorisez l'accès à votre caméra, puis pointez-la vers le QR code affiché par le censeur ou le responsable de l'événement. Votre présence sera automatiquement validée.
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
