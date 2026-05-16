import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useNotificationStore } from '../../stores/useNotificationStore'
import api from '../../lib/axios'
import { 
    Home, Folder, CheckSquare, QrCode, Trophy, MessageSquare, 
    Briefcase, Smartphone, Users, AlertTriangle, ClipboardList, 
    BarChart2, Monitor, LogOut, Bell, Menu, X, ChevronRight, Settings
} from 'lucide-react'

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const { unreadCount, startPolling, stopPolling } = useNotificationStore()

    useEffect(() => {
        if (user) {
            startPolling()
        }
        return () => stopPolling()
    }, [user, startPolling, stopPolling])

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
            { to: '/dashboard', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
            { to: '/projects', label: 'Projets', icon: <Folder className="w-5 h-5" /> },
            { to: '/mes-participations', label: 'Mes projets', icon: <Briefcase className="w-5 h-5" /> },
            { to: '/mes-taches', label: 'Mes tâches', icon: <CheckSquare className="w-5 h-5" /> },
            { to: '/presences', label: 'Présences', icon: <QrCode className="w-5 h-5" /> },
            { to: '/scores', label: 'Mon score', icon: <Trophy className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
        chef_projet: [
            { to: '/dashboard', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
            { to: '/projects', label: 'Projets', icon: <Folder className="w-5 h-5" /> },
            { to: '/mes-projets', label: 'Mes projets gérés', icon: <Briefcase className="w-5 h-5" /> },
            { to: '/mes-participations', label: 'Mes projets', icon: <Briefcase className="w-5 h-5" /> },
            { to: '/mes-taches', label: 'Mes tâches', icon: <CheckSquare className="w-5 h-5" /> },
            { to: '/presences', label: 'Présences', icon: <QrCode className="w-5 h-5" /> },
            { to: '/scores', label: 'Mon score', icon: <Trophy className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
        censeur: [
            { to: '/dashboard', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
            { to: '/censeur/qrcodes', label: 'QR Codes', icon: <Smartphone className="w-5 h-5" /> },
            { to: '/censeur/membres', label: 'Membres', icon: <Users className="w-5 h-5" /> },
            { to: '/censeur/infractions', label: 'Infractions', icon: <AlertTriangle className="w-5 h-5" /> },
            { to: '/projects', label: 'Projets', icon: <Folder className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
        admin: [
            { to: '/dashboard', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
            { to: '/admin/inscriptions', label: 'Inscriptions', icon: <ClipboardList className="w-5 h-5" /> },
            { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <Users className="w-5 h-5" /> },
            { to: '/admin/groupes', label: 'Groupes', icon: <MessageSquare className="w-5 h-5" /> },
            { to: '/admin/statistiques', label: 'Statistiques', icon: <BarChart2 className="w-5 h-5" /> },
            { to: '/forum', label: 'Forum', icon: <MessageSquare className="w-5 h-5" /> },
        ],
    }

    const links = navLinks[user?.role] || navLinks.membre

    return (
        <div className="min-h-[100dvh] bg-[#05050f] flex font-sans text-slate-300 relative overflow-hidden">
            {/* Ambient Backgrounds */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#05050f]/80 backdrop-blur-2xl border-r border-white/5 transform transition-transform duration-300 ease-in-out
                ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:relative lg:translate-x-0 lg:flex lg:flex-col
            `}>
                {/* Logo */}
                <div className="h-24 flex items-center px-8 border-b border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Link to="/dashboard" className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
                            <Monitor className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight">Club Génie</h1>
                            <p className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">Espace {user?.role?.replace('_', ' ')}</p>
                        </div>
                    </Link>
                    <button className="ml-auto lg:hidden text-slate-400 hover:text-white relative z-10" onClick={() => setMenuOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Menu Principal</div>
                    {links.map((link) => {
                        const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`
                                    flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group relative overflow-hidden
                                    ${isActive
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-white'}
                                `}
                            >
                                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-white/5 rounded-2xl"></div>}
                                <div className={`relative z-10 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-300'} transition-colors`}>
                                    {link.icon}
                                </div>
                                <span className="relative z-10">{link.label}</span>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-indigo-400 relative z-10" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* User info */}
                <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl -mr-10 -mt-10 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white shadow-xl overflow-hidden">
                                {user?.avatar_url ? (
                                    <img src={user.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                        {user?.prenom?.[0]}{user?.nom?.[0]}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">{user?.prenom} {user?.nom}</p>
                                <p className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider truncate">{user?.role?.replace('_', ' ')}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 py-3 rounded-xl transition-colors relative z-10"
                        >
                            <LogOut className="w-4 h-4" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay mobile */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-[#05050f]/80 backdrop-blur-sm lg:hidden transition-opacity" onClick={() => setMenuOpen(false)} />
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-h-[100dvh] overflow-hidden relative z-10">
                {/* Header */}
                <header className="h-24 bg-[#05050f]/60 backdrop-blur-xl border-b border-white/5 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="hidden sm:block">
                            <h2 className="text-2xl font-extrabold text-white capitalize tracking-tight">
                                {location.pathname.split('/')[1]?.replace('-', ' ') || 'Dashboard'}
                            </h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl backdrop-blur-md">
                            <Trophy className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                            <span className="text-sm font-black text-yellow-400">
                                {user?.score_total || 0} pts
                            </span>
                        </div>
                        
                        <Link to="/notifications" className="relative p-3 bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all group">
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-rose-500 text-[10px] font-bold text-white border-2 border-[#05050f] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse">
                                    {unreadCount > 99 ? '99+' : unreadCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 pb-28 md:p-10 custom-scrollbar relative z-10">
                    <div className="mx-auto max-w-7xl relative">
                        {children}
                    </div>
                </main>

                {/* Mobile Bottom Navigation Bar */}
                <nav className="lg:hidden fixed bottom-0 w-full bg-[#05050f]/80 backdrop-blur-2xl border-t border-white/5 z-40 pb-safe">
                    <div className="flex justify-around items-center h-20 px-2">
                        {links.slice(0, 4).map((link) => {
                            const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                            return (
                                <Link
                                    key={link.to + '_mobile'}
                                    to={link.to}
                                    className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <div className={`${isActive ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400' : 'border-transparent'} border p-2 rounded-xl transition-all`}>
                                        {link.icon}
                                    </div>
                                    <span className="text-[10px] font-bold tracking-wide truncate max-w-full px-1">{link.label}</span>
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