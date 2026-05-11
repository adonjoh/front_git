import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/layout/DashboardLayout'
import { Link } from 'react-router-dom'
import { 
    ClipboardList, Users, MessageSquare, Smartphone, AlertTriangle, 
    Briefcase, FolderCheck, CheckSquare, Folder, QrCode, Trophy, ArrowRight
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
            <div className="space-y-8">
                {/* Bienvenue */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                            Bonjour, {user?.prenom} 👋
                        </h2>
                        <p className="text-indigo-100 text-lg mb-8 font-medium">
                            {roleLabel[user?.role] || 'Membre'} — Club Génie Informatique & Télécoms
                        </p>
                        
                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                            <div className="w-12 h-12 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-sm text-indigo-100 font-medium">Score Total</span>
                                <p className="text-2xl font-bold tracking-tight">{user?.score_total || 0} <span className="text-base font-normal text-indigo-200">pts</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accès Rapides */}
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        Actions Rapides
                    </h3>
                    
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Inscriptions" desc="Valider les nouveaux membres" icon={<ClipboardList className="w-8 h-8" />} to="/admin/inscriptions" color="from-blue-500 to-cyan-500" />
        <Card title="Utilisateurs" desc="Gérer tous les membres" icon={<Users className="w-8 h-8" />} to="/admin/utilisateurs" color="from-emerald-500 to-teal-500" />
        <Card title="Groupes" desc="Créer des groupes de discussion" icon={<MessageSquare className="w-8 h-8" />} to="/admin/groupes" color="from-purple-500 to-pink-500" />
    </div>
)

const CenseurCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="QR Codes" desc="Générer des codes de présence" icon={<Smartphone className="w-8 h-8" />} to="/censeur/qrcodes" color="from-blue-500 to-cyan-500" />
        <Card title="Membres" desc="Suivre l'évolution des membres" icon={<Users className="w-8 h-8" />} to="/censeur/membres" color="from-emerald-500 to-teal-500" />
        <Card title="Infractions" desc="Gérer les sanctions" icon={<AlertTriangle className="w-8 h-8" />} to="/censeur/infractions" color="from-red-500 to-rose-500" />
    </div>
)

const ChefCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Mes projets" desc="Gérer vos projets" icon={<Briefcase className="w-8 h-8" />} to="/mes-projets" color="from-blue-500 to-indigo-500" />
        <Card title="Candidatures" desc="Traiter les demandes" icon={<FolderCheck className="w-8 h-8" />} to="/mes-projets" color="from-amber-500 to-orange-500" />
        <Card title="Tâches" desc="Suivre les tâches" icon={<CheckSquare className="w-8 h-8" />} to="/mes-taches" color="from-emerald-500 to-teal-500" />
    </div>
)

const MembreCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Projets" desc="Découvrir et candidater" icon={<Folder className="w-8 h-8" />} to="/projects" color="from-blue-500 to-indigo-500" />
        <Card title="Mes tâches" desc="Voir mes tâches assignées" icon={<CheckSquare className="w-8 h-8" />} to="/mes-taches" color="from-emerald-500 to-teal-500" />
        <Card title="Scanner QR" desc="Enregistrer ma présence" icon={<QrCode className="w-8 h-8" />} to="/presences" color="from-purple-500 to-fuchsia-500" />
    </div>
)

const Card = ({ title, desc, icon, to, color }) => (
    <Link to={to} className="group relative bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity -mr-10 -mt-10`}></div>
        
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-6 shadow-lg`}>
            {icon}
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
        <p className="text-slate-500 mb-6 font-medium">{desc}</p>
        
        <div className="flex items-center text-sm font-bold text-indigo-500 gap-1 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Y aller <ArrowRight className="w-4 h-4" />
        </div>
    </Link>
)

export default Dashboard