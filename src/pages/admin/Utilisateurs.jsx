import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import api from '../../lib/axios'

const ROLES = ['membre', 'chef_projet', 'censeur', 'admin']

const Utilisateurs = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [filtreRole, setFiltreRole] = useState('')
    const [filtreStatut, setFiltreStatut] = useState('')
    const [editRole, setEditRole] = useState(null)

    const charger = async () => {
        try {
            const params = new URLSearchParams()
            if (filtreRole) params.append('role', filtreRole)
            if (filtreStatut) params.append('statut', filtreStatut)
            const res = await api.get(`/admin/users?${params}`)
            setUsers(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { charger() }, [filtreRole, filtreStatut])

    const modifierRole = async (userId, role) => {
        try {
            await api.put(`/admin/users/${userId}/role`, { role })
            setUsers(users.map(u => u.id === userId ? { ...u, roles: [{ name: role }] } : u))
            setEditRole(null)
        } catch (err) {
            console.error(err)
        }
    }

    const supprimer = async (userId) => {
        if (!confirm('Supprimer cet utilisateur définitivement ?')) return
        try {
            await api.delete(`/admin/users/${userId}`)
            setUsers(users.filter(u => u.id !== userId))
        } catch (err) {
            alert(err.response?.data?.message || 'Erreur.')
        }
    }

    const statutColor = {
        actif: 'bg-green-100 text-green-700',
        en_attente: 'bg-yellow-100 text-yellow-700',
        suspendu: 'bg-orange-100 text-orange-700',
        renvoye: 'bg-red-100 text-red-700',
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">👥 Utilisateurs</h2>

                {/* Filtres */}
                <div className="flex gap-3 flex-wrap">
                    <select
                        value={filtreRole}
                        onChange={e => setFiltreRole(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Tous les rôles</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select
                        value={filtreStatut}
                        onChange={e => setFiltreStatut(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="actif">Actif</option>
                        <option value="en_attente">En attente</option>
                        <option value="suspendu">Suspendu</option>
                        <option value="renvoye">Renvoyé</option>
                    </select>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Chargement...</div>
                ) : (
                    <div className="bg-white rounded-xl border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600">Membre</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600">Rôle</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600">Statut</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600">Score</th>
                                    <th className="text-left px-5 py-3 font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                                                    {user.prenom?.[0]}{user.nom?.[0]}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{user.prenom} {user.nom}</p>
                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            {editRole === user.id ? (
                                                <select
                                                    defaultValue={user.roles?.[0]?.name}
                                                    onChange={e => modifierRole(user.id, e.target.value)}
                                                    className="border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                                </select>
                                            ) : (
                                                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                                                    {user.roles?.[0]?.name || 'membre'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${statutColor[user.statut]}`}>
                                                {user.statut}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 font-medium text-gray-700">
                                            {user.score_total} pts
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditRole(editRole === user.id ? null : user.id)}
                                                    className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                                                >
                                                    ✏️ Rôle
                                                </button>
                                                <button
                                                    onClick={() => supprimer(user.id)}
                                                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                                                >
                                                    🗑️ Suppr.
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <div className="text-center py-8 text-gray-400">Aucun utilisateur trouvé.</div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Utilisateurs