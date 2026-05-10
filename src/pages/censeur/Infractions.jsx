import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { AlertOctagon, Bell, Shield, Frown, CheckCircle } from 'lucide-react';

export default function Infractions() {
    const [infracteurs, setInfracteurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchInfractions = async () => {
        setLoading(true);
        try {
            // Récupérer tous les membres puis filtrer, ou si l'API permet: GET /admin/users?role=membre&score_lt=0
            const res = await axios.get('/admin/users?role=membre');
            const allMembers = res.data.data || res.data;
            const badMembers = allMembers.filter(m => m.score_total < 0);
            setInfracteurs(badMembers);
        } catch (err) {
            setError("Erreur lors du chargement des infractions.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInfractions();
    }, []);

    const handleAction = async (id, actionType) => {
        setActionLoading(id);
        try {
            // Ces endpoints sont simulés, adaptez-les selon votre backend exact
            if (actionType === 'notifier') {
                // Peut-être envoyer une notification
                await new Promise(r => setTimeout(r, 1000)); // Simulate API call
                alert("Avertissement envoyé avec succès.");
            } else if (actionType === 'sanctionner') {
                // Peut-être suspendre le compte
                await new Promise(r => setTimeout(r, 1000)); // Simulate API call
                alert("Membre sanctionné.");
            }
        } catch (err) {
            alert(`Erreur lors de l'action.`);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <DashboardLayout title="Gestion des Infractions">
            <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start">
                    <AlertOctagon className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <h2 className="text-lg font-bold text-red-900">Membres en zone critique</h2>
                        <p className="text-red-700 mt-1">Cette liste contient tous les membres dont le score total est négatif. Vous pouvez leur envoyer un avertissement ou appliquer une sanction disciplinaire selon le règlement du club.</p>
                    </div>
                </div>

                {error && <div className="text-red-500 font-medium">{error}</div>}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
                    </div>
                ) : infracteurs.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center shadow-sm">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Excellente nouvelle !</h3>
                        <p className="text-gray-500">Aucun membre n'a de score négatif actuellement. La discipline du club est au beau fixe.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {infracteurs.map(membre => (
                            <div key={membre.id} className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-5 border-b border-red-50 bg-red-50/30 flex justify-between items-start">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg mr-3 shadow-sm border border-red-200">
                                            {membre.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{membre.name}</h3>
                                            <p className="text-xs text-gray-500">{membre.email}</p>
                                        </div>
                                    </div>
                                    <div className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-sm flex items-center">
                                        <Frown className="w-4 h-4 mr-1" /> {membre.score_total}
                                    </div>
                                </div>
                                <div className="p-5 flex gap-3">
                                    <button
                                        onClick={() => handleAction(membre.id, 'notifier')}
                                        disabled={actionLoading === membre.id}
                                        className="flex-1 flex justify-center items-center px-4 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        <Bell className="w-4 h-4 mr-2" />
                                        Notifier
                                    </button>
                                    <button
                                        onClick={() => handleAction(membre.id, 'sanctionner')}
                                        disabled={actionLoading === membre.id}
                                        className="flex-1 flex justify-center items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                                    >
                                        <Shield className="w-4 h-4 mr-2" />
                                        Sanctionner
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
