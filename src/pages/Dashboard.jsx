import { useAuth } from '../hooks/useAuth'
import DashboardLayout from '../components/layout/DashboardLayout'

const Dashboard = () => {
    const { user } = useAuth()

    const roleLabel = {
        admin: '⚙️ Administrateur',
        censeur: '🛡️ Censeur',
        chef_projet: '📋 Chef de Projet',
        membre: '👤 Membre',
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Bienvenue */}
                <div className="bg-indigo-600 rounded-2xl p-6 text-white">
                    <h2 className="text-2xl font-bold">
                        Bienvenue, {user?.prenom} 👋
                    </h2>
                    <p className="text-indigo-200 mt-1">
                        {roleLabel[user?.role]} — Club Génie Informatique & Télécoms
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            <span className="text-sm">Score total</span>
                            <p className="text-2xl font-bold">{user?.score_total || 0} pts</p>
                        </div>
                    </div>
                </div>

                {/* Cards selon le rôle */}
                {user?.role === 'admin' && <AdminCards />}
                {user?.role === 'censeur' && <CenseurCards />}
                {user?.role === 'chef_projet' && <ChefCards />}
                {user?.role === 'membre' && <MembreCards />}
            </div>
        </DashboardLayout>
    )
}

const AdminCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Inscriptions" desc="Valider les nouveaux membres" icon="📋" to="/admin/inscriptions" color="bg-blue-50 border-blue-200" />
        <Card title="Utilisateurs" desc="Gérer tous les membres" icon="👥" to="/admin/utilisateurs" color="bg-green-50 border-green-200" />
        <Card title="Groupes" desc="Créer des groupes de discussion" icon="💬" to="/admin/groupes" color="bg-purple-50 border-purple-200" />
    </div>
)

const CenseurCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="QR Codes" desc="Générer des codes de présence" icon="📱" to="/censeur/qrcodes" color="bg-blue-50 border-blue-200" />
        <Card title="Membres" desc="Suivre l'évolution des membres" icon="👥" to="/censeur/membres" color="bg-green-50 border-green-200" />
        <Card title="Infractions" desc="Gérer les sanctions" icon="⚠️" to="/censeur/infractions" color="bg-red-50 border-red-200" />
    </div>
)

const ChefCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Mes projets" desc="Gérer vos projets" icon="🗂️" to="/mes-projets" color="bg-blue-50 border-blue-200" />
        <Card title="Candidatures" desc="Traiter les candidatures" icon="📋" to="/candidatures" color="bg-yellow-50 border-yellow-200" />
        <Card title="Tâches" desc="Suivre les tâches" icon="✅" to="/mes-taches" color="bg-green-50 border-green-200" />
    </div>
)

const MembreCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Projets" desc="Candidater à un projet" icon="📁" to="/projects" color="bg-blue-50 border-blue-200" />
        <Card title="Mes tâches" desc="Voir mes tâches assignées" icon="✅" to="/mes-taches" color="bg-green-50 border-green-200" />
        <Card title="Scanner QR" desc="Enregistrer ma présence" icon="📷" to="/presences" color="bg-purple-50 border-purple-200" />
    </div>
)

const Card = ({ title, desc, icon, to, color }) => (
    <a href={to} className={`block border rounded-xl p-5 ${color} hover:shadow-md transition-shadow`}>
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </a>
)

export default Dashboard