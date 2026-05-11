import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../lib/axios'
import { 
    Home, Folder, CheckSquare, QrCode, Trophy, MessageSquare, 
    Briefcase, Smartphone, Users, AlertTriangle, ClipboardList, 
    BarChart2, Monitor, LogOut, Bell, Menu, X, ChevronRight
} from 'lucide-react'

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
            { to: '/dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" /> },
            { to: '/projects', label: 'Projets', icon: <Folder className="w-5 h-5" /> },
            { to: '/mes-taches', label: 'Mes tâches', icon: <CheckSquare className="w-5 h-5" /> },
            { to: '/presences', label: 'Scanner QR', icon: <QrCode className="w-5 h-5" /> },
            { to: '/scores', label: 'Mon score', icon: <Trophy className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
        chef_projet: [
            { to: '/dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" /> },
            { to: '/projects', label: 'Projets', icon: <Folder className="w-5 h-5" /> },
            { to: '/mes-projets', label: 'Mes projets gérés', icon: <Briefcase className="w-5 h-5" /> },
            { to: '/mes-taches', label: 'Mes tâches', icon: <CheckSquare className="w-5 h-5" /> },
            { to: '/presences', label: 'Scanner QR', icon: <QrCode className="w-5 h-5" /> },
            { to: '/scores', label: 'Mon score', icon: <Trophy className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
        censeur: [
            { to: '/dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" /> },
            { to: '/censeur/qrcodes', label: 'QR Codes', icon: <Smartphone className="w-5 h-5" /> },
            { to: '/censeur/membres', label: 'Membres', icon: <Users className="w-5 h-5" /> },
            { to: '/censeur/infractions', label: 'Infractions', icon: <AlertTriangle className="w-5 h-5" /> },
            { to: '/projects', label: 'Projets', icon: <Folder className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
        admin: [
            { to: '/dashboard', label: 'Tableau de bord', icon: <Home className="w-5 h-5" /> },
            { to: '/admin/inscriptions', label: 'Inscriptions', icon: <ClipboardList className="w-5 h-5" /> },
            { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <Users className="w-5 h-5" /> },
            { to: '/admin/groupes', label: 'Groupes', icon: <MessageSquare className="w-5 h-5" /> },
            { to: '/admin/statistiques', label: 'Statistiques', icon: <BarChart2 className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
    }

    const links = navLinks[user?.role] || navLinks.membre

    return (
        <div className="min-h-[100dvh] bg-slate-50 flex font-sans text-slate-900">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 transform transition-transform duration-300 ease-in-out
                ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:relative lg:translate-x-0 lg:flex lg:flex-col shadow-2xl lg:shadow-none
            `}>
                {/* Logo */}
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <Link to="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <Monitor className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white tracking-tight">Club Génie</h1>
                            <p className="text-xs text-indigo-400 font-medium">Info & Télécoms</p>
                        </div>
                    </Link>
                    <button className="ml-auto lg:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">Menu Principal</div>
                    {links.map((link) => {
                        const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400'
                                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
                                `}
                            >
                                <div className={`${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                                    {link.icon}
                                </div>
                                {link.label}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-indigo-500/50" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* User info */}
                <div className="p-4 m-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-inner">
                            {user?.prenom?.[0]}{user?.nom?.[0]}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{user?.prenom} {user?.nom}</p>
                            <p className="text-xs text-indigo-400 capitalize truncate">{user?.role?.replace('_', ' ')}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 py-2 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden transition-opacity" onClick={() => setMenuOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-h-[100dvh] overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:block">
                            <h2 className="text-lg font-bold text-slate-800 capitalize">
                                {location.pathname.split('/')[1]?.replace('-', ' ') || 'Dashboard'}
                            </h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-bold text-yellow-700">
                                {user?.score_total || 0} pts
                            </span>
                        </div>
                        
                        <Link to="/notifications" className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors group">
                            <Bell className="w-6 h-6" />
                            {/* Pastille de notification (statique pour l'instant) */}
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full group-hover:border-indigo-50"></span>
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 pb-24 lg:pb-8 lg:p-8 bg-slate-50 relative">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation Bar (App style) */}
                <nav className="lg:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 pb-safe">
                    <div className="flex justify-around items-center h-16 px-2">
                        {links.slice(0, 4).map((link) => {
                            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                            return (
                                <Link
                                    key={link.to + '_mobile'}
                                    to={link.to}
                                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <div className={`${isActive ? 'bg-indigo-50' : ''} p-1.5 rounded-full transition-colors`}>
                                        {link.icon}
                                    </div>
                                    <span className="text-[10px] font-medium truncate max-w-full px-1">{link.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default DashboardLayout