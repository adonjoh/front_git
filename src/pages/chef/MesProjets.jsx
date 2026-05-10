import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Folder, Users, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MesProjets() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedProject, setExpandedProject] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/projects');
            const allProjects = res.data.data || res.data;
            // Filtrer les projets par chef_projet_id
            const myProjects = allProjects.filter(p => p.chef_projet_id === user?.id || p.user_id === user?.id);
            setProjects(myProjects);
        } catch (err) {
            setError("Erreur lors du chargement de vos projets.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [user]);

    const handleTraiterCandidature = async (candidatureId, statut) => {
        setActionLoading(candidatureId);
        try {
            await axios.put(`/candidatures/${candidatureId}/traiter`, { statut });
            // Refresh to update candidatures
            await fetchProjects();
        } catch (err) {
            alert("Erreur lors du traitement de la candidature.");
        } finally {
            setActionLoading(null);
        }
    };

    const toggleProject = (projectId) => {
        if (expandedProject === projectId) {
            setExpandedProject(null);
        } else {
            setExpandedProject(projectId);
        }
    };

    return (
        <DashboardLayout title="Mes Projets Gérés">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Projets que je dirige</h1>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center text-gray-500">
                        <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Vous ne dirigez aucun projet pour le moment.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map(project => {
                            const candidaturesEnAttente = project.candidatures?.filter(c => c.statut === 'en_attente' || c.statut === 'attente') || [];
                            
                            return (
                                <div key={project.id} className="bg-white rounded-xl border shadow-sm overflow-hidden transition-all">
                                    <div className="p-5">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{project.titre || project.nom}</h3>
                                                <p className="text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <Link 
                                                    to={`/projets/${project.id}/taches`}
                                                    className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Gérer les tâches
                                                </Link>
                                                <button 
                                                    onClick={() => toggleProject(project.id)}
                                                    className={`px-4 py-2 flex items-center rounded-lg text-sm font-medium transition-colors ${
                                                        candidaturesEnAttente.length > 0 
                                                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200' 
                                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                    }`}
                                                >
                                                    <Users className="w-4 h-4 mr-2" />
                                                    Candidatures ({candidaturesEnAttente.length})
                                                    {expandedProject === project.id ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Candidatures (Expanded) */}
                                    {expandedProject === project.id && (
                                        <div className="border-t border-gray-100 bg-gray-50 p-5">
                                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                                                <Clock className="w-4 h-4 mr-2 text-gray-500" /> 
                                                Candidatures en attente
                                            </h4>
                                            
                                            {candidaturesEnAttente.length === 0 ? (
                                                <p className="text-gray-500 text-sm">Aucune candidature en attente pour ce projet.</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {candidaturesEnAttente.map(c => (
                                                        <div key={c.id} className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-3">
                                                                    {c.user?.prenom ? c.user.prenom.charAt(0).toUpperCase() : '?'}
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-gray-900">
                                                                        {c.user ? `${c.user.prenom || ''} ${c.user.nom || ''}`.trim() : 'Utilisateur inconnu'}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">{c.user?.email || ''}</p>
                                                                    {c.motivation && <p className="text-sm text-gray-600 mt-1 italic">"{c.motivation}"</p>}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleTraiterCandidature(c.id, 'accepte')}
                                                                    disabled={actionLoading === c.id}
                                                                    className="flex items-center px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                                                >
                                                                    {actionLoading === c.id ? <Clock className="w-4 h-4 mr-1 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                                                                    Accepter
                                                                </button>
                                                                <button
                                                                    onClick={() => handleTraiterCandidature(c.id, 'refuse')}
                                                                    disabled={actionLoading === c.id}
                                                                    className="flex items-center px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                                                >
                                                                    {actionLoading === c.id ? <Clock className="w-4 h-4 mr-1 animate-spin" /> : <XCircle className="w-4 h-4 mr-1" />}
                                                                    Refuser
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}