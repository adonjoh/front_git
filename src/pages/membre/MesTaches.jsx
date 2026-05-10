import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { CheckCircle, Send, Clock, AlertCircle } from 'lucide-react';

export default function MesTaches() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            // First get all projects to know their IDs
            const projectsRes = await axios.get('/projects');
            const projects = projectsRes.data.data || projectsRes.data;

            // Then fetch tasks for all projects and flatten
            const tasksPromises = projects.map(p => axios.get(`/projects/${p.id}/tasks`).catch(() => null));
            const tasksResponses = await Promise.all(tasksPromises);
            
            let allTasks = [];
            tasksResponses.forEach((res, index) => {
                if (res && res.data) {
                    const projectTasks = res.data.data || res.data;
                    const projectTaskWithProjectInfo = projectTasks.map(t => ({...t, project_name: projects[index].titre || projects[index].nom || 'Projet'}));
                    allTasks = [...allTasks, ...projectTaskWithProjectInfo];
                }
            });

            // Filter tasks assigned to current user
            const myTasks = allTasks.filter(task => task.user_id === user?.id || task.assignee_id === user?.id);
            setTasks(myTasks);
        } catch (err) {
            setError("Erreur lors du chargement des tâches.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (taskId, action) => {
        setActionLoading(taskId);
        try {
            if (action === 'accepter') {
                await axios.put(`/tasks/${taskId}/accepter`);
            } else if (action === 'soumettre') {
                await axios.put(`/tasks/${taskId}/soumettre`);
            }
            await fetchTasks(); // Refresh list
        } catch (err) {
            setError(`Erreur lors de l'action sur la tâche.`);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'a_faire': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'en_cours': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'soumis': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'valide': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejete': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'a_faire': return 'À faire';
            case 'en_cours': return 'En cours';
            case 'soumis': return 'Soumis (en attente)';
            case 'valide': return 'Validé';
            case 'rejete': return 'Rejeté';
            default: return status;
        }
    };

    return (
        <DashboardLayout title="Mes Tâches">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Tâches assignées</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center text-gray-500">
                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Aucune tâche ne vous est assignée pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.map(task => (
                            <div key={task.id} className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.statut)}`}>
                                        {getStatusText(task.statut)}
                                    </span>
                                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                                        {task.project_name}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.titre}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                                
                                <div className="mt-4 flex gap-2 pt-4 border-t border-gray-100">
                                    {task.statut === 'a_faire' && (
                                        <button
                                            onClick={() => handleAction(task.id, 'accepter')}
                                            disabled={actionLoading === task.id}
                                            className="flex-1 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === task.id ? <Clock className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                            Accepter
                                        </button>
                                    )}
                                    {(task.statut === 'en_cours' || task.statut === 'rejete') && (
                                        <button
                                            onClick={() => handleAction(task.id, 'soumettre')}
                                            disabled={actionLoading === task.id}
                                            className="flex-1 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            {actionLoading === task.id ? <Clock className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                            Soumettre
                                        </button>
                                    )}
                                    {(task.statut === 'soumis' || task.statut === 'valide') && (
                                        <div className="flex-1 text-center py-2 text-sm text-gray-500 font-medium">
                                            Aucune action requise
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
