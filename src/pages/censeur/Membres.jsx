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
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Users className="w-6 h-6 mr-2 text-indigo-600" /> Annuaire des Membres
                    </h1>
                    
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 border-b border-red-100 flex items-center">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : filteredMembres.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p>Aucun membre trouvé.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membre</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Total</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredMembres.map((membre) => {
                                        const isNegative = membre.score_total < 0;
                                        
                                        return (
                                            <tr key={membre.id} className={`hover:bg-gray-50 transition-colors ${isNegative ? 'bg-red-50/30' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${isNegative ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                                            {membre.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className={`text-sm font-medium ${isNegative ? 'text-red-900' : 'text-gray-900'}`}>
                                                                {membre.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{membre.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-sm font-bold flex items-center ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
                                                        {isNegative && <ShieldAlert className="w-4 h-4 mr-1" />}
                                                        {membre.score_total} pts
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${membre.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {membre.statut || 'Actif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex gap-1">
                                                        {membre.badges && membre.badges.length > 0 ? (
                                                            membre.badges.map((b, i) => (
                                                                <span key={i} title={b.nom} className="text-lg">{b.icon || '🏆'}</span>
                                                            ))
                                                        ) : (
                                                            <span className="text-gray-400 italic">Aucun</span>
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
