import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/layout/DashboardLayout'
import { Link } from 'react-router-dom'
import { 
    ClipboardList, Users, MessageSquare, Smartphone, AlertTriangle, 
    Briefcase, FolderCheck, CheckSquare, Folder, QrCode, Trophy, ArrowRight,
    Star, Sparkles, Activity
} from 'lucide-react'

const Dashboard = () => {
    const { user } = useAuth()

    const roleLabel = {
        admin: 'Administrateur',
        censeur: 'Censeur',
        chef_projet: 'Chef de Projet',
        membre: 'Membre',
    }

    return (
        <DashboardLayout>
            <div className="space-y-10 animate-fade-in-up">
                {/* Bienvenue */}
                <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl border border-white/10 group">
                    {/* Abstract Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-[#05050f] to-purple-900"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-400/30 transition-colors duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-pink-500/20 transition-colors duration-700"></div>
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg">
                            <Sparkles className="w-4 h-4" /> Espace {roleLabel[user?.role] || 'Membre'}
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
                            Bonjour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">{user?.prenom}</span> 👋
                        </h2>
                        <p className="text-indigo-200/70 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
                            Bienvenue sur votre espace. Prêt à innover et à relever de nouveaux défis aujourd'hui ?
                        </p>
                        
                        <div className="inline-flex items-center gap-5 bg-white/[0.03] backdrop-blur-xl rounded-3xl p-5 border border-white/10 shadow-2xl transition-all hover:bg-white/[0.05]">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                                <Trophy className="w-7 h-7" />
                            </div>
                            <div className="pr-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Score Total</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black tracking-tighter text-white">{user?.score_total || 0}</span>
                                    <span className="text-sm font-bold text-indigo-400">pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accès Rapides */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                            Actions Rapides
                        </h3>
                    </div>
                    
                    {user?.role === 'admin' && <AdminCards />}
                    {user?.role === 'censeur' && <CenseurCards />}
                    {user?.role === 'chef_projet' && <ChefCards />}
                    {user?.role === 'membre' && <MembreCards />}
                </div>
            </div>
        </DashboardLayout>
    )
}

const AdminCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Inscriptions" desc="Valider les nouveaux membres" icon={<ClipboardList className="w-7 h-7" />} to="/admin/inscriptions" color="from-blue-500 to-cyan-500" shadowColor="shadow-blue-500/20" />
        <Card title="Utilisateurs" desc="Gérer tous les membres" icon={<Users className="w-7 h-7" />} to="/admin/utilisateurs" color="from-emerald-500 to-teal-500" shadowColor="shadow-emerald-500/20" />
        <Card title="Groupes" desc="Créer des groupes de discussion" icon={<MessageSquare className="w-7 h-7" />} to="/admin/groupes" color="from-purple-500 to-pink-500" shadowColor="shadow-purple-500/20" />
    </div>
)

const CenseurCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="QR Codes" desc="Générer des codes de présence" icon={<Smartphone className="w-7 h-7" />} to="/censeur/qrcodes" color="from-blue-500 to-cyan-500" shadowColor="shadow-blue-500/20" />
        <Card title="Membres" desc="Suivre l'évolution des membres" icon={<Users className="w-7 h-7" />} to="/censeur/membres" color="from-emerald-500 to-teal-500" shadowColor="shadow-emerald-500/20" />
        <Card title="Infractions" desc="Gérer les sanctions" icon={<AlertTriangle className="w-7 h-7" />} to="/censeur/infractions" color="from-rose-500 to-red-600" shadowColor="shadow-rose-500/20" />
    </div>
)

const ChefCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Mes projets" desc="Gérer vos projets" icon={<Briefcase className="w-7 h-7" />} to="/mes-projets" color="from-indigo-500 to-blue-600" shadowColor="shadow-indigo-500/20" />
        <Card title="Candidatures" desc="Traiter les demandes" icon={<FolderCheck className="w-7 h-7" />} to="/mes-projets" color="from-amber-500 to-orange-500" shadowColor="shadow-amber-500/20" />
        <Card title="Tâches" desc="Suivre les tâches" icon={<CheckSquare className="w-7 h-7" />} to="/mes-taches" color="from-emerald-500 to-teal-500" shadowColor="shadow-emerald-500/20" />
    </div>
)

const MembreCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Projets" desc="Découvrir et candidater" icon={<Folder className="w-7 h-7" />} to="/projects" color="from-indigo-500 to-blue-600" shadowColor="shadow-indigo-500/20" />
        <Card title="Mes tâches" desc="Voir mes tâches assignées" icon={<CheckSquare className="w-7 h-7" />} to="/mes-taches" color="from-emerald-500 to-teal-500" shadowColor="shadow-emerald-500/20" />
        <Card title="Scanner QR" desc="Enregistrer ma présence" icon={<QrCode className="w-7 h-7" />} to="/presences" color="from-fuchsia-500 to-pink-600" shadowColor="shadow-fuchsia-500/20" />
    </div>
)

const Card = ({ title, desc, icon, to, color, shadowColor }) => (
    <Link to={to} className="group relative bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[220px]">
        {/* Glow effect */}
        <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-opacity duration-700`}></div>
        
        <div className="relative z-10">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-6 shadow-lg ${shadowColor} group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-slate-400 font-light leading-relaxed">{desc}</p>
        </div>
        
        <div className="relative z-10 mt-6 flex items-center text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            Explorer <ArrowRight className="w-5 h-5 text-purple-400" />
        </div>
    </Link>
)

export default Dashboard