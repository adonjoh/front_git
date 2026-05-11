import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, Plus, MessageSquare, Briefcase, Calendar, UserPlus } from 'lucide-react';

export default function Groupes() {
    const [groupes, setGroupes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    
    // Form state pour nouveau groupe
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        type: 'discussion'
    });

    // Form state pour ajouter membre
    const [addMemberData, setAddMemberData] = useState({});

    const fetchGroupes = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/groups');
            setGroupes(res.data.data || res.data);
        } catch (err) {
            setError("Erreur lors du chargement des groupes.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupes();
    }, []);

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            await axios.post('/groups', formData);
            setFormData({ nom: '', description: '', type: 'discussion' });
            fetchGroupes();
        } catch (err) {
            alert("Erreur lors de la création du groupe.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleAddMember = async (e, groupId) => {
        e.preventDefault();
        const userId = addMemberData[groupId];
        if (!userId) return;

        try {
            await axios.post(`/groups/${groupId}/membres`, { user_id: parseInt(userId) });
            setAddMemberData({...addMemberData, [groupId]: ''});
            alert("Membre ajouté avec succès !");
            // Optionnel : refresh du groupe si on affiche les membres
        } catch (err) {
            alert("Erreur lors de l'ajout du membre. Vérifiez l'ID.");
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'evenement': return <Calendar className="w-5 h-5 text-purple-600" />;
            case 'organisation': return <Briefcase className="w-5 h-5 text-blue-600" />;
            case 'discussion':
            default: return <MessageSquare className="w-5 h-5 text-green-600" />;
        }
    };

    const getTypeLabel = (type) => {
        switch(type) {
            case 'evenement': return 'Événement';
            case 'organisation': return 'Organisation';
            case 'discussion': return 'Discussion';
            default: return type;
        }
    };

    return (
        <DashboardLayout title="Gestion des Groupes">
            <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Colonne de gauche: Formulaire */}
                <div className="lg:col-span-1">
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6 shadow-sm sticky top-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Plus className="w-5 h-5 mr-2 text-indigo-600" /> Créer un groupe
                        </h2>
                        
                        <form onSubmit={handleCreateGroup} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Nom du groupe</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                    placeholder="Ex: Team Hackathon 2024"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Sujet ou objectif de ce groupe..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Type de groupe</label>
                                <select
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/[0.02] backdrop-blur-md"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                >
                                    <option value="discussion">Discussion (Général)</option>
                                    <option value="evenement">Événement (Ponctuel)</option>
                                    <option value="organisation">Organisation (Projet/Équipe)</option>
                                </select>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 mt-2"
                            >
                                {submitLoading ? 'Création...' : 'Créer le groupe'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Colonne de droite: Liste des groupes */}
                <div className="lg:col-span-2 space-y-4">
                    {error && <div className="text-red-500 p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">{error}</div>}
                    
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : groupes.length === 0 ? (
                        <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-12 text-center text-slate-400">
                            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">Aucun groupe n'existe pour le moment.</p>
                        </div>
                    ) : (
                        groupes.map(groupe => (
                            <div key={groupe.id} className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/[0.01] rounded-lg border border-white/5">
                                            {getTypeIcon(groupe.type)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{groupe.nom}</h3>
                                            <span className="text-xs font-medium text-slate-400 bg-white/[0.02] px-2 py-0.5 rounded-full">
                                                {getTypeLabel(groupe.type)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-full flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {groupe.membres_count || '?'}
                                    </div>
                                </div>
                                
                                <p className="text-slate-400 text-sm mb-5">{groupe.description}</p>
                                
                                {/* Section Ajout membre */}
                                <div className="border-t border-white/5 pt-4 mt-auto">
                                    <form onSubmit={(e) => handleAddMember(e, groupe.id)} className="flex gap-2">
                                        <input
                                            type="number"
                                            required
                                            placeholder="ID de l'utilisateur"
                                            className="flex-1 px-3 py-1.5 border border-white/10 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            value={addMemberData[groupe.id] || ''}
                                            onChange={(e) => setAddMemberData({...addMemberData, [groupe.id]: e.target.value})}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-white/[0.02] hover:bg-gray-200 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center transition-colors"
                                        >
                                            <UserPlus className="w-4 h-4 mr-1" />
                                            Ajouter
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
            </div>
        </DashboardLayout>
    );
}
