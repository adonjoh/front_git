import { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import api from '../../lib/axios'

const Inscriptions = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionId, setActionId] = useState(null)

    const charger = async () => {
        try {
            const res = await api.get('/admin/inscriptions')
            setUsers(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { charger() }, [])

    const valider = async (id) => {
        setActionId(id)
        try {
            await api.put(`/admin/inscriptions/${id}/valider`)
            setUsers(users.filter(u => u.id !== id))
        } catch (err) {
            console.error(err)
        } finally {
            setActionId(null)
        }
    }

    const rejeter = async (id) => {
        if (!confirm('Confirmer le rejet de cette inscription ?')) return
        setActionId(id)
        try {
            await api.put(`/admin/inscriptions/${id}/rejeter`)
            setUsers(users.filter(u => u.id !== id))
        } catch (err) {
            console.error(err)
        } finally {
            setActionId(null)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">📋 Inscriptions en attente</h2>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {users.length} en attente
                    </span>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-400">Chargement...</div>
                ) : users.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center">
                        <p className="text-4xl mb-3">✅</p>
                        <p className="text-gray-500">Aucune inscription en attente.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {users.map(user => (
                            <div key={user.id} className="bg-white rounded-xl border p-5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                                        {user.prenom?.[0]}{user.nom?.[0]}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{user.prenom} {user.nom}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                        {user.telephone && <p className="text-sm text-gray-400">{user.telephone}</p>}
                                        <p className="text-xs text-gray-400 mt-1">
                                            Inscrit le {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => valider(user.id)}
                                        disabled={actionId === user.id}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        ✅ Valider
                                    </button>
                                    <button
                                        onClick={() => rejeter(user.id)}
                                        disabled={actionId === user.id}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                    >
                                        ❌ Rejeter
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Inscriptions