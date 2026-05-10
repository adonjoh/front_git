import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/axios'

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await api.post('/login', form)
            setAuth(res.data.user, res.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur de connexion.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">🖥️</h1>
                    <h2 className="text-2xl font-bold text-white mt-2">Club Génie</h2>
                    <p className="text-indigo-300 mt-1">Informatique & Télécoms</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Connexion</h3>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="votre@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input
                                type="password"
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Pas encore membre ?{' '}
                        <Link to="/register" className="text-indigo-600 hover:underline font-medium">
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login