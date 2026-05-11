import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, Search, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function Membres() {
    const [membres, setMembres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMembres = async () => {
            try {
                const res = await axios.get('/admin/users?role=membre');
                setMembres(res.data.data || res.data);
            } catch (err) {
                setError("Erreur lors du chargement des membres.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMembres();
    }, []);

    const filteredMembres = membres.filter(m => 
        (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (m.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout title="Suivi des Membres">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <Users className="w-6 h-6 mr-2 text-indigo-600" /> Annuaire des Membres
                    </h1>
                    
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-white/[0.02] backdrop-blur-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border shadow-sm overflow-hidden">
                    {error && (
                        <div className="p-4 bg-rose-500/10 text-rose-400 border-b border-red-100 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : filteredMembres.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p>Aucun membre trouvé.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/[0.01]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Membre</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Score Total</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Statut</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Badges</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white/[0.02] backdrop-blur-md divide-y divide-white/10">
                                    {filteredMembres.map((membre) => {
                                        const isNegative = membre.score_total < 0;
                                        
                                        return (
                                            <tr key={membre.id} className={`hover:bg-white/[0.01] transition-colors ${isNegative ? 'bg-rose-500/10/30' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${isNegative ? 'bg-red-100 text-rose-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                                            {membre.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className={`text-sm font-medium ${isNegative ? 'text-red-900' : 'text-white'}`}>
                                                                {membre.name}
                                                            </div>
                                                            <div className="text-sm text-slate-400">{membre.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-sm font-bold flex items-center ${isNegative ? 'text-rose-400' : 'text-green-600'}`}>
                                                        {isNegative && <ShieldAlert className="w-4 h-4 mr-1" />}
                                                        {membre.score_total} pts
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${membre.statut === 'actif' ? 'bg-emerald-500/20 text-green-800' : 'bg-white/[0.02] text-white'}`}>
                                                        {membre.statut || 'Actif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                                                    <div className="flex gap-1">
                                                        {membre.badges && membre.badges.length > 0 ? (
                                                            membre.badges.map((b, i) => (
                                                                <span key={i} title={b.nom} className="text-lg">{b.icon || '🏆'}</span>
                                                            ))
                                                        ) : (
                                                            <span className="text-slate-500 italic">Aucun</span>
                                                        )}
                                                    </div>
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
