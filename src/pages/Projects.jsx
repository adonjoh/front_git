import { useNotificationStore } from '../stores/useNotificationStore';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import { useAuth } from '../hooks/useAuth'
import api from '../lib/axios'

const Projects = () => {
    const addToast = useNotificationStore(state => state.addToast);
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ titre: '', description: '', date_fin: '', max_membres: 5 })
    const [submitting, setSubmitting] = useState(false)
    const [mesCandidatures, setMesCandidatures] = useState([])
    const { user } = useAuth()

    const charger = async () => {
        try {
            const [projectsRes, candRes] = await Promise.all([
                api.get('/projects'),
                api.get('/mes-candidatures')
            ]);
            setProjects(projectsRes.data);
            setMesCandidatures(candRes.data.data || candRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { charger() }, [])

    const getCandidatureStatut = (projectId) => {
        const cand = mesCandidatures.find(c => c.projet_id === projectId || c.project_id === projectId);
        return cand?.statut || null;
    }

    const creerProjet = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await api.post('/projects', form)
            setShowForm(false)
            setForm({ titre: '', description: '', date_fin: '', max_membres: 5 })
            charger()
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }

    const candidater = async (projectId) => {
        try {
            await api.post(`/projects/${projectId}/candidater`, { motivation: 'Je souhaite rejoindre ce projet.' })
            addToast('Candidature soumise avec succès !', "success")
        } catch (err) {
            addToast(err.response?.data?.message || 'Erreur.', "error")
        }
    }

    const statutColor = {
        brouillon: 'bg-white/[0.02] text-slate-400',
        ouvert: 'bg-emerald-500/20 text-emerald-400',
        en_cours: 'bg-blue-500/20 text-blue-400',
        termine: 'bg-purple-500/20 text-purple-400',
    }

    const canCreate = ['chef_projet', 'admin'].includes(user?.role)

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">📁 Projets</h2>
                    {canCreate && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            + Nouveau projet
                        </button>
                    )}
                </div>

                {/* Formulaire création */}
                {showForm && (
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-6">
                        <h3 className="font-semibold text-white mb-4">Créer un projet</h3>
                        <form onSubmit={creerProjet} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Titre</label>
                                <input
                                    type="text" required
                                    value={form.titre}
                                    onChange={e => setForm({ ...form, titre: e.target.value })}
                                    className="w-full border border-white/10 bg-white/5 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                                <textarea
                                    required rows={3}
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    className="w-full border border-white/10 bg-white/5 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Date de fin</label>
                                    <input
                                        type="date"
                                        value={form.date_fin}
                                        onChange={e => setForm({ ...form, date_fin: e.target.value })}
                                        className="w-full border border-white/10 bg-white/5 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Max membres</label>
                                    <input
                                        type="number" min={1} max={20}
                                        value={form.max_membres}
                                        onChange={e => setForm({ ...form, max_membres: e.target.value })}
                                        className="w-full border border-white/10 bg-white/5 rounded-lg text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit" disabled={submitting}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {submitting ? 'Création...' : 'Créer le projet'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="border px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/[0.01]"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Liste projets */}
                {loading ? (
                    <div className="text-center py-12 text-slate-500">Chargement...</div>
                ) : projects.length === 0 ? (
                    <div className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-12 text-center">
                        <p className="text-4xl mb-3">📭</p>
                        <p className="text-slate-400">Aucun projet disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map(project => (
                            <div key={project.id} className="bg-white/[0.02] backdrop-blur-md rounded-xl border p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-white">{project.titre}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${statutColor[project.statut]}`}>
                                        {project.statut}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                                    <span>👤 {project.chef_projet?.prenom} {project.chef_projet?.nom}</span>
                                    {project.date_fin && (
                                        <span>📅 {new Date(project.date_fin).toLocaleDateString('fr-FR')}</span>
                                    )}
                                    <span>👥 Max {project.max_membres}</span>
                                </div>
                                {user?.role === 'membre' && project.statut === 'ouvert' && (() => {
                                    const statut = getCandidatureStatut(project.id);
                                    const canCandidater = statut === null || statut === 'refuse';
                                    return (
                                        <button
                                            onClick={() => candidater(project.id)}
                                            disabled={!canCandidater}
                                            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                                                canCandidater 
                                                ? 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400' 
                                                : 'bg-slate-500/10 text-slate-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {statut === 'accepte' ? 'Accepté' : statut === 'en_attente' ? 'En attente' : statut === 'refuse' ? 'Repostuler' : 'Candidater'}
                                        </button>
                                    );
                                })()}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Projects