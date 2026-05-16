import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Clock, CheckCircle, XCircle, Folder } from 'lucide-react';

export default function MesCandidatures() {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidatures = async () => {
            try {
                const res = await axios.get('/mes-candidatures');
                setCandidatures(res.data.data || res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidatures();
    }, []);

    const getStatutBadge = (statut) => {
        const styles = {
            en_attente: 'bg-amber-500/20 text-amber-400',
            accepte: 'bg-emerald-500/20 text-emerald-400',
            refuse: 'bg-rose-500/20 text-rose-400',
        };
        const labels = {
            en_attente: 'En attente',
            accepte: 'Acceptée',
            refuse: 'Refusée',
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${styles[statut] || styles.en_attente}`}>
                {labels[statut] || statut}
            </span>
        );
    };

    return (
        <DashboardLayout title="Mes Candidatures">
            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : candidatures.length === 0 ? (
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-12 text-center text-slate-400">
                        <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Vous n'avez soumis aucune candidature.</p>
                        <p className="text-sm mt-2">Parcourez les projets disponibles pour postuler.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {candidatures.map((c) => (
                            <div key={c.id} className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{c.projet?.titre || 'Projet'}</h3>
                                        <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                                            {c.projet?.description || ''}
                                        </p>
                                        {c.motivation && (
                                            <p className="text-sm text-slate-500 mt-2 italic">"{c.motivation}"</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {c.statut === 'en_attente' && <Clock className="w-5 h-5 text-amber-400" />}
                                        {c.statut === 'accepte' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                                        {c.statut === 'refuse' && <XCircle className="w-5 h-5 text-rose-400" />}
                                        {getStatutBadge(c.statut)}
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-slate-500">
                                    Soumise le {c.created_at ? new Date(c.created_at).toLocaleDateString('fr-FR') : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}