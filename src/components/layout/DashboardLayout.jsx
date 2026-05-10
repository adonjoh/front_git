import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/axios'

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await api.post('/logout')
        } finally {
            logout()
            navigate('/login')
        }
    }

    const navLinks = {
        membre: [
            { to: '/dashboard', label: '🏠 Tableau de bord' },
            { to: '/projects', label: '📁 Projets' },
            { to: '/mes-taches', label: '✅ Mes tâches' },
            { to: '/presences', label: '📷 Scanner QR' },
            { to: '/scores', label: '🏆 Mon score' },
            { to: '/forum', label: '💬 Forum' },
        ],
        chef_projet: [
            { to: '/dashboard', label: '🏠 Tableau de bord' },
            { to: '/projects', label: '📁 Projets' },
            { to: '/mes-projets', label: '🗂️ Mes projets' },
            { to: '/mes-taches', label: '✅ Tâches' },
            { to: '/presences', label: '📷 Scanner QR' },
            { to: '/scores', label: '🏆 Mon score' },
            { to: '/forum', label: '💬 Forum' },
        ],
        censeur: [
            { to: '/dashboard', label: '🏠 Tableau de bord' },
            { to: '/censeur/qrcodes', label: '📱 QR Codes' },
            { to: '/censeur/membres', label: '👥 Membres' },
            { to: '/censeur/infractions', label: '⚠️ Infractions' },
            { to: '/projects', label: '📁 Projets' },
            { to: '/forum', label: '💬 Forum' },
        ],
        admin: [
            { to: '/dashboard', label: '🏠 Tableau de bord' },
            { to: '/admin/inscriptions', label: '📋 Inscriptions' },
            { to: '/admin/utilisateurs', label: '👥 Utilisateurs' },
            { to: '/admin/groupes', label: '💬 Groupes' },
            { to: '/admin/statistiques', label: '📊 Statistiques' },
            { to: '/forum', label: '💬 Forum' },
        ],
    }

    const links = navLinks[user?.role] || navLinks.membre

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-200
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex lg:flex-col
      `}>
                {/* Logo */}
                <div className="p-6 border-b border-indigo-700">
                    <h1 className="text-xl font-bold">🖥️ Club Génie</h1>
                    <p className="text-indigo-300 text-sm mt-1">Informatique & Télécoms</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === link.to
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}
              `}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* User info */}
                <div className="p-4 border-t border-indigo-700">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-lg">
                            {user?.prenom?.[0]}{user?.nom?.[0]}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user?.prenom} {user?.nom}</p>
                            <p className="text-xs text-indigo-300 capitalize">{user?.role?.replace('_', ' ')}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left text-sm text-indigo-300 hover:text-white px-2 py-1 rounded transition-colors"
                    >
                        🚪 Déconnexion
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMenuOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <button
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                    <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm text-gray-500">
                            🏆 {user?.score_total || 0} pts
                        </span>
                        <Link to="/notifications" className="relative text-gray-600 hover:text-indigo-600">
                            🔔
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout