import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Trophy, Star, Medal, Award, Target, Users } from 'lucide-react';

export default function Scores() {
    const { user, updateUser } = useAuth();
    const [classement, setClassement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [badges, setBadges] = useState([]);
    const [scoreTotal, setScoreTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch fresh user data to get updated score and badges
                const meRes = await axios.get('/me');
                const userData = meRes.data.data || meRes.data;
                updateUser(userData);
                setScoreTotal(userData.score_total || 0);
                setBadges(userData.badges || []);

                // Fetch classement
                const classRes = await axios.get('/classement');
                setClassement(classRes.data.data || classRes.data);
            } catch (err) {
                setError("Erreur lors du chargement des scores.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getNiveauInfo = (score) => {
        if (score >= 2000) return { nom: 'Élite', couleur: 'bg-purple-500/20 text-purple-800 border-purple-200', icon: <Trophy className="w-6 h-6 text-purple-600" /> };
        if (score >= 1001) return { nom: 'Expert', couleur: 'bg-red-100 text-red-800 border-rose-500/20', icon: <Award className="w-6 h-6 text-rose-400" /> };
        if (score >= 501) return { nom: 'Confirmé', couleur: 'bg-orange-100 text-orange-800 border-orange-200', icon: <Medal className="w-6 h-6 text-orange-600" /> };
        if (score >= 201) return { nom: 'Membre', couleur: 'bg-blue-500/20 text-blue-800 border-blue-200', icon: <Star className="w-6 h-6 text-blue-600" /> };
        return { nom: 'Recrue', couleur: 'bg-white/[0.02] text-white border-white/10', icon: <Target className="w-6 h-6 text-slate-400" /> };
    };

    const monNiveau = getNiveauInfo(scoreTotal);

    return (
        <DashboardLayout title="Scores et Classement">
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Mon Score */}
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -z-10 opacity-50"></div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Trophy className="w-5 h-5 mr-2 text-indigo-600" /> Mon Score
                        </h2>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-4xl font-extrabold text-indigo-600 mb-1">{scoreTotal} <span className="text-lg font-medium text-slate-400">pts</span></p>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${monNiveau.couleur} mt-2`}>
                                    {monNiveau.icon}
                                    <span className="ml-2">Niveau : {monNiveau.nom}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-indigo-500/10 rounded-full">
                                <Star className="w-12 h-12 text-indigo-600" fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    {/* Mes Badges */}
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-indigo-600" /> Mes Badges
                        </h2>
                        {badges.length === 0 ? (
                            <div className="text-center py-6 text-slate-400">
                                <Medal className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                                <p>Vous n'avez pas encore de badges.</p>
                                <p className="text-sm">Participez aux projets pour en gagner !</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {badges.map((badge, idx) => (
                                    <div key={idx} className="flex flex-col items-center p-3 bg-white/[0.01] rounded-lg border border-white/5 hover:border-indigo-200 transition-colors" title={badge.description}>
                                        {/* Assuming badge might have an icon or we use a generic one */}
                                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-2">
                                            <span className="text-2xl">{badge.icon || '🏆'}</span>
                                        </div>
                                        <span className="text-xs font-medium text-center text-white">{badge.nom}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Classement Général */}
                <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Users className="w-5 h-5 mr-2 text-indigo-600" /> Classement Général
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-center text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.02] backdrop-blur-md border-b border-white/5">
                                        <th className="p-4 font-semibold text-slate-400 text-sm w-16 text-center">Rang</th>
                                        <th className="p-4 font-semibold text-slate-400 text-sm">Membre</th>
                                        <th className="p-4 font-semibold text-slate-400 text-sm">Niveau</th>
                                        <th className="p-4 font-semibold text-slate-400 text-sm text-right">Score Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classement.map((membre, index) => {
                                        const isCurrentUser = membre.id === user?.id;
                                        const niveau = getNiveauInfo(membre.score_total);
                                        return (
                                            <tr key={membre.id} className={`border-b border-gray-50 hover:bg-white/[0.01] transition-colors ${isCurrentUser ? 'bg-indigo-500/10/50' : ''}`}>
                                                <td className="p-4 text-center font-bold">
                                                    {index === 0 ? <span className="text-yellow-500 text-lg">🥇</span> :
                                                     index === 1 ? <span className="text-slate-500 text-lg">🥈</span> :
                                                     index === 2 ? <span className="text-amber-600 text-lg">🥉</span> :
                                                     <span className="text-slate-400">{index + 1}</span>}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mr-3">
                                                            {membre.name ? membre.name.charAt(0).toUpperCase() : '?'}
                                                        </div>
                                                        <div>
                                                            <div className={`font-semibold ${isCurrentUser ? 'text-indigo-400' : 'text-white'}`}>
                                                                {membre.name} {isCurrentUser && <span className="text-xs bg-indigo-500/20 text-indigo-800 px-2 py-0.5 rounded ml-2">Vous</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium border ${niveau.couleur}`}>
                                                        {niveau.nom}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right font-bold text-white">
                                                    {membre.score_total}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
