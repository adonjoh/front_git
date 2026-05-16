import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../lib/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, Plus, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useNotificationStore } from '../../stores/useNotificationStore';

export default function ProjetTaches() {
    const addToast = useNotificationStore(state => state.addToast);
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    
    // Form state
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ titre: '', description: '', assignee_id: '' });
    const [submitLoading, setSubmitLoading] = useState(false);

    const fetchProjectAndTasks = async () => {
        setLoading(true);
        try {
            // Dans un cas réel, on récupérerait d'abord les infos du projet, 
            // mais ici on a juste besoin de ses tâches via l'API, on fait au mieux
            const [projRes, tasksRes] = await Promise.all([
                axios.get(`/projects/${id}`).catch(() => ({ data: { nom: `Projet #${id}` } })),
                axios.get(`/projects/${id}/tasks`)
            ]);
            
            setProject(projRes.data.data || projRes.data);
            setTasks(tasksRes.data.data || tasksRes.data);
        } catch (err) {
            setError("Erreur lors du chargement des tâches du projet.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectAndTasks();
    }, [id]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            await axios.post(`/projects/${id}/tasks`, formData);
            setFormData({ titre: '', description: '', assignee_id: '' });
            setShowForm(false);
            fetchProjectAndTasks();
        } catch (err) {
            addToast("Erreur lors de la création de la tâche.", "error");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleValidation = async (taskId, statut) => {
        setActionLoading(taskId);
        try {
            await axios.put(`/tasks/${taskId}/valider`, { statut });
            await fetchProjectAndTasks();
        } catch (err) {
            addToast("Erreur lors de la validation de la tâche.", "error");
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusStyle = (status) => {
        switch(status) {
            case 'a_faire': return 'bg-white/[0.02] text-white';
            case 'en_cours': return 'bg-blue-500/20 text-blue-800';
            case 'soumis': return 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 ring-offset-1';
            case 'valide': return 'bg-emerald-500/20 text-green-800';
            case 'rejete': return 'bg-red-100 text-red-800';
            default: return 'bg-white/[0.02] text-white';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'a_faire': return 'À faire';
            case 'en_cours': return 'En cours';
            case 'soumis': return 'À VALIDER';
            case 'valide': return 'Validé';
            case 'rejete': return 'Rejeté';
            default: return status;
        }
    };

    return (
        <DashboardLayout title="Gestion des Tâches">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                    <div>
                        <Link to="/mes-projets" className="inline-flex items-center text-sm text-slate-400 hover:text-indigo-600 mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Retour à mes projets
                        </Link>
                        <h1 className="text-2xl font-bold text-white">
                            Tâches du projet <span className="text-indigo-600">{project?.titre || project?.nom || ''}</span>
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm"
                    >
                        {showForm ? <XCircle className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                        {showForm ? 'Annuler' : 'Nouvelle Tâche'}
                    </button>
                </div>

                {error && (
                    <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl border border-rose-500/20 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                )}

                {/* Formulaire de création */}
                {showForm && (
                    <div className="bg-white/[0.02] backdrop-blur-md p-6 rounded-xl border border-indigo-100 shadow-md">
                        <h2 className="text-lg font-bold text-white mb-4">Créer une nouvelle tâche</h2>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Titre de la tâche</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.titre}
                                    onChange={(e) => setFormData({...formData, titre: e.target.value})}
                                    placeholder="Ex: Maquette page d'accueil"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Détails de ce qui doit être accompli..."
                                ></textarea>
                            </div>
                            {/* Idéalement on aurait un select avec les membres du projet pour assignee_id */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">ID du membre assigné (Optionnel)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.assignee_id}
                                    onChange={(e) => setFormData({...formData, assignee_id: e.target.value})}
                                    placeholder="Laisser vide pour une tâche non assignée"
                                />
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-70"
                                >
                                    {submitLoading ? <Clock className="w-5 h-5 mr-2 animate-spin" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                                    Créer la tâche
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Liste des tâches */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="bg-white/[0.01] border-2 border-dashed border-white/10 rounded-xl p-12 text-center text-slate-400">
                        <p>Aucune tâche n'a été créée pour ce projet.</p>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="mt-4 text-indigo-600 font-medium hover:underline"
                        >
                            Créer la première tâche
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.map(task => (
                            <div key={task.id} className={`bg-white/[0.02] backdrop-blur-md rounded-xl border p-5 shadow-sm transition-all ${task.statut === 'soumis' ? 'border-yellow-300 bg-amber-500/10/30' : ''}`}>
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusStyle(task.statut)}`}>
                                        {getStatusText(task.statut)}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{task.titre}</h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3">{task.description}</p>
                                
                                {task.assignee && (
                                    <div className="text-sm text-slate-400 mb-4 bg-white/[0.01] px-3 py-2 rounded-lg">
                                        Assigné à : <span className="font-medium text-white">{task.assignee.name}</span>
                                    </div>
                                )}

                                {/* Actions pour les tâches soumises */}
                                {task.statut === 'soumis' && (
                                    <div className="mt-4 pt-4 border-t border-amber-500/20 flex gap-2">
                                        <button
                                            onClick={() => handleValidation(task.id, 'valide')}
                                            disabled={actionLoading === task.id}
                                            className="flex-1 flex justify-center items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === task.id ? <Clock className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                                            Valider
                                        </button>
                                        <button
                                            onClick={() => handleValidation(task.id, 'rejete')}
                                            disabled={actionLoading === task.id}
                                            className="flex-1 flex justify-center items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === task.id ? <Clock className="w-4 h-4 animate-spin mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                                            Rejeter
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
