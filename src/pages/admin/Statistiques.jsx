import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, UserCheck, ShieldAlert, Clock, UserCog, Activity } from 'lucide-react';

export default function Statistiques() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/admin/statistiques');
                setStats(res.data.data || res.data);
            } catch (err) {
                setError("Erreur lors du chargement des statistiques.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Helper components pour les cards
    const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass, description }) => (
        <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 ${bgColorClass}`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900">{value !== undefined ? value : '-'}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bgColorClass} ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {description && (
                <p className="text-sm text-gray-500 relative z-10 border-t border-gray-100 pt-3 mt-3">
                    {description}
                </p>
            )}
        </div>
    );

    return (
        <DashboardLayout title="Statistiques & Vue d'ensemble">
            <div className="space-y-6">
                
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Section Principale */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard 
                                title="Utilisateurs Totaux" 
                                value={stats?.total_users} 
                                icon={Activity} 
                                colorClass="text-indigo-600" 
                                bgColorClass="bg-indigo-100"
                                description="Tous les comptes inscrits sur la plateforme"
                            />
                            <StatCard 
                                title="Membres Actifs" 
                                value={stats?.total_membres} 
                                icon={UserCheck} 
                                colorClass="text-green-600" 
                                bgColorClass="bg-green-100"
                                description="Membres validés avec accès complet"
                            />
                            <StatCard 
                                title="Chefs de Projet" 
                                value={stats?.total_chefs} 
                                icon={UserCog} 
                                colorClass="text-blue-600" 
                                bgColorClass="bg-blue-100"
                                description="Responsables de projets et équipes"
                            />
                        </div>

                        {/* Section Statuts */}
                        <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4">Statuts des comptes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center">
                                <div className="p-4 bg-yellow-100 rounded-full mr-6">
                                    <Clock className="w-8 h-8 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">En Attente de Validation</p>
                                    <div className="flex items-baseline mt-1">
                                        <span className="text-4xl font-extrabold text-gray-900">{stats?.en_attente !== undefined ? stats.en_attente : '-'}</span>
                                        <span className="ml-2 text-sm text-gray-500">comptes</span>
                                    </div>
                                    <p className="text-sm text-yellow-700 mt-2 font-medium">Nécessite votre attention dans l'onglet Inscriptions</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center">
                                <div className="p-4 bg-red-100 rounded-full mr-6">
                                    <ShieldAlert className="w-8 h-8 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Comptes Suspendus</p>
                                    <div className="flex items-baseline mt-1">
                                        <span className="text-4xl font-extrabold text-gray-900">{stats?.suspendus !== undefined ? stats.suspendus : '-'}</span>
                                        <span className="ml-2 text-sm text-gray-500">comptes</span>
                                    </div>
                                    <p className="text-sm text-red-700 mt-2 font-medium">Interdits d'accès par le Censeur ou l'Administrateur</p>
                                </div>
                            </div>
                        </div>

                        {/* Note supplémentaire si besoin */}
                        <div className="mt-8 bg-indigo-50 rounded-xl p-5 border border-indigo-100 flex items-start">
                            <Users className="w-5 h-5 text-indigo-600 mr-3 mt-0.5" />
                            <p className="text-indigo-800 text-sm">
                                Ces statistiques sont générées en temps réel depuis la base de données. Utilisez les autres onglets d'administration pour gérer individuellement ces utilisateurs.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
