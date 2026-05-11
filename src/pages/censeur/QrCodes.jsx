import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Plus, Clock, Activity, History } from 'lucide-react';

export default function QrCodes() {
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        evenement: '',
        type: 'seance',
        expire_dans: '60'
    });
    
    const [newQrCode, setNewQrCode] = useState(null);

    const fetchQrCodes = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/qrcodes');
            setQrCodes(res.data.data || res.data);
        } catch (err) {
            setError("Erreur lors du chargement des QR codes.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQrCodes();
    }, []);

    const handleCreateQrCode = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const res = await axios.post('/qrcodes', {
                ...formData,
                expire_dans: parseInt(formData.expire_dans)
            });
            const created = res.data.data || res.data;
            setNewQrCode(created);
            setFormData({ evenement: '', type: 'seance', expire_dans: '60' });
            fetchQrCodes();
        } catch (err) {
            alert("Erreur lors de la génération du QR code.");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <DashboardLayout title="Gestion des Présences">
            <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Formulaire de création */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Plus className="w-5 h-5 mr-2 text-indigo-600" /> Générer un QR Code
                        </h2>
                        
                        <form onSubmit={handleCreateQrCode} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Nom de l'événement</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.evenement}
                                    onChange={(e) => setFormData({...formData, evenement: e.target.value})}
                                    placeholder="Ex: Séance algorithmique #4"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Type d'activité</label>
                                <select
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/[0.02] backdrop-blur-md"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                >
                                    <option value="seance">Séance (Travail)</option>
                                    <option value="evenement">Événement (Hackathon...)</option>
                                    <option value="reunion">Réunion</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Expiration (minutes)</label>
                                <input
                                    type="number"
                                    required
                                    min="5"
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.expire_dans}
                                    onChange={(e) => setFormData({...formData, expire_dans: e.target.value})}
                                />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-center transition-colors"
                            >
                                {submitLoading ? <Clock className="w-5 h-5 mr-2 animate-spin" /> : <QrCode className="w-5 h-5 mr-2" />}
                                Générer
                            </button>
                        </form>
                    </div>

                    {/* Affichage du QR Code généré */}
                    {newQrCode && (
                        <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 shadow-sm border-indigo-200">
                            <h3 className="text-center font-bold text-white mb-2">{newQrCode.evenement}</h3>
                            <div className="bg-white/[0.02] backdrop-blur-md p-4 rounded-xl border flex justify-center items-center mb-4">
                                <QRCodeSVG value={newQrCode.token} size={200} level="M" includeMargin={true} />
                            </div>
                            <p className="text-center text-sm text-slate-400">Demandez aux membres de scanner ce code depuis leur espace.</p>
                        </div>
                    )}
                </div>

                {/* Historique des QR Codes */}
                <div className="lg:col-span-2">
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border shadow-sm overflow-hidden h-full">
                        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                            <h2 className="text-xl font-bold text-white flex items-center">
                                <History className="w-5 h-5 mr-2 text-indigo-600" /> Historique des QR Codes
                            </h2>
                        </div>
                        
                        <div className="p-5">
                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : qrCodes.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <QrCode className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                    <p>Aucun QR code n'a été généré pour le moment.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {qrCodes.map(qr => {
                                        // Simple vérification côté front (le backend devrait idéalement le fournir)
                                        const dateCreation = new Date(qr.created_at);
                                        const expirationDate = new Date(dateCreation.getTime() + (qr.expire_dans * 60000));
                                        const isExpired = new Date() > expirationDate;

                                        return (
                                            <div key={qr.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-white/5 rounded-xl hover:bg-white/[0.01] transition-colors">
                                                <div>
                                                    <div className="flex items-center mb-1">
                                                        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                                        <h4 className="font-bold text-white">{qr.evenement}</h4>
                                                    </div>
                                                    <div className="flex items-center text-sm text-slate-400">
                                                        <span className="capitalize">{qr.type}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>Créé le {dateCreation.toLocaleDateString()} à {dateCreation.toLocaleTimeString()}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 sm:mt-0 text-right">
                                                    {isExpired ? (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Expiré
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-green-800 border border-emerald-500/20">
                                                            <Activity className="w-3 h-3 mr-1" /> Actif
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
