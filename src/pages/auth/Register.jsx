import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../lib/axios'
import { ArrowRight, Mail, Lock, User, Phone, Loader2 } from 'lucide-react'

const Register = () => {
    const [form, setForm] = useState({
        nom: '', prenom: '', email: '',
        telephone: '', password: '', password_confirmation: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await api.post('/register', form)
            setSuccess('Inscription réussie ! Votre compte est en attente de validation.')
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            const errors = err.response?.data?.errors
            if (errors) {
                setError(Object.values(errors).flat().join(' '))
            } else {
                setError(err.response?.data?.message || 'Erreur lors de l\'inscription.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[100dvh] relative flex items-center justify-center bg-[#05050f] overflow-hidden selection:bg-indigo-500/30 p-4 font-sans sm:py-12">
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_80%)] pointer-events-none"></div>

            <div className="w-full max-w-xl relative z-10">
                <div className="text-center mb-10 animate-fade-in-up">
                    <Link to="/" className="inline-block group">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-2xl text-white shadow-2xl shadow-indigo-500/30 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                            CG
                        </div>
                    </Link>
                    <h2 className="text-3xl font-bold text-white mt-6 tracking-tight">Rejoindre l'Aventure</h2>
                    <p className="text-indigo-200/70 mt-2 text-sm">Créez votre compte pour intégrer le Club Génie.</p>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/[0.05] shadow-2xl shadow-black/50 p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-6 text-sm flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 mb-6 text-sm flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></div>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider pl-1">Nom</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text" required
                                        value={form.nom}
                                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider pl-1">Prénom</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text" required
                                        value={form.prenom}
                                        onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                                        placeholder="Votre prénom"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider pl-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email" required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                                    placeholder="vous@exemple.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider pl-1">Téléphone</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <input
                                    type="tel"
                                    value={form.telephone}
                                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                                    placeholder="+212 6..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider pl-1">Mot de passe</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password" required
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider pl-1">Confirmer</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password" required
                                        value={form.password_confirmation}
                                        onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:hover:scale-100 group"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    S'inscrire
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-8">
                        Déjà membre ?{' '}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register