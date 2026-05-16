import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Folder, Clock, CheckCircle, Users, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MesParticipations() {
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

    const projetsParticipes = candidatures.filter(c => c.statut === 'accepte');
    const projetsEnAttente = candidatures.filter(c => c.statut === 'en_attente');

    return (
        <DashboardLayout title="Mes Projets">
            <div className="space-y-8">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
                                Projets où je participe
                            </h2>
                            {projetsParticipes.length === 0 ? (
                                <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 text-center text-slate-400">
                                    <Users className="w-10 h-10 mx-auto mb-2 text-gray-500" />
                                    <p>Vous ne participez à aucun projet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projetsParticipes.map((c) => (
                                        <div key={c.id} className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-semibold text-white">{c.projet?.titre || c.project?.titre || 'Projet'}</h3>
                                                <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                                    Membre
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                                {c.projet?.description || c.project?.description || ''}
                                            </p>
                                            <Link
                                                to={`/projets/${c.projet_id || c.project_id}/taches`}
                                                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                                            >
                                                <LinkIcon className="w-4 h-4 mr-1" />
                                                Voir les tâches
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-amber-400" />
                                Candidatures en attente
                            </h2>
                            {projetsEnAttente.length === 0 ? (
                                <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 text-center text-slate-400">
                                    <Clock className="w-10 h-10 mx-auto mb-2 text-gray-500" />
                                    <p>Aucune candidature en attente.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projetsEnAttente.map((c) => (
                                        <div key={c.id} className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="font-semibold text-white">{c.projet?.titre || c.project?.titre || 'Projet'}</h3>
                                                <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-400">
                                                    En attente
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                                                {c.projet?.description || c.project?.description || ''}
                                            </p>
                                            {c.motivation && (
                                                <p className="text-xs text-slate-500 italic">"{c.motivation}"</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}