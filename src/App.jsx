import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Landing from './pages/Landing';
import Showcase from './pages/Showcase';
import InstallPWA from './components/ui/InstallPWA';

// Pages Membre
import MesTaches from './pages/membre/MesTaches';
import Presences from './pages/membre/Presences';
import Scores from './pages/membre/Scores';

// Pages Chef de projet
import MesProjets from './pages/chef/MesProjets';
import ProjetTaches from './pages/chef/ProjetTaches';

// Pages Censeur
import QrCodes from './pages/censeur/QrCodes';
import Membres from './pages/censeur/Membres';
import Infractions from './pages/censeur/Infractions';

// Pages Admin
import Inscriptions from './pages/admin/Inscriptions';
import Utilisateurs from './pages/admin/Utilisateurs';
import Groupes from './pages/admin/Groupes';
import Statistiques from './pages/admin/Statistiques';

// Pages Communes
import Forum from './pages/Forum';
import Notifications from './pages/Notifications';
import MesGroupes from './pages/MesGroupes';

import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <InstallPWA />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/vitrine" element={<Showcase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Pages Communes (tous connectés) --- */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute><Projects /></ProtectedRoute>
        } />
        <Route path="/scores" element={
          <ProtectedRoute><Scores /></ProtectedRoute>
        } />
        <Route path="/forum" element={
          <ProtectedRoute><Forum /></ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute><Notifications /></ProtectedRoute>
        } />
        <Route path="/mes-groupes" element={
          <ProtectedRoute><MesGroupes /></ProtectedRoute>
        } />

        {/* --- Pages Membre (et plus) --- */}
        <Route path="/mes-taches" element={
          <ProtectedRoute roles={['membre', 'chef_projet', 'admin']}>
            <MesTaches />
          </ProtectedRoute>
        } />
        <Route path="/presences" element={
          <ProtectedRoute roles={['membre', 'chef_projet']}>
            <Presences />
          </ProtectedRoute>
        } />

        {/* --- Pages Chef de projet --- */}
        <Route path="/mes-projets" element={
          <ProtectedRoute roles={['chef_projet', 'admin']}>
            <MesProjets />
          </ProtectedRoute>
        } />
        <Route path="/projets/:id/taches" element={
          <ProtectedRoute roles={['chef_projet', 'admin']}>
            <ProjetTaches />
          </ProtectedRoute>
        } />

        {/* --- Pages Censeur --- */}
        <Route path="/censeur/qrcodes" element={
          <ProtectedRoute roles={['censeur', 'admin']}>
            <QrCodes />
          </ProtectedRoute>
        } />
        <Route path="/censeur/membres" element={
          <ProtectedRoute roles={['censeur', 'admin']}>
            <Membres />
          </ProtectedRoute>
        } />
        <Route path="/censeur/infractions" element={
          <ProtectedRoute roles={['censeur', 'admin']}>
            <Infractions />
          </ProtectedRoute>
        } />

        {/* --- Pages Admin --- */}
        <Route path="/admin/inscriptions" element={
          <ProtectedRoute roles={['admin']}>
            <Inscriptions />
          </ProtectedRoute>
        } />
        <Route path="/admin/utilisateurs" element={
          <ProtectedRoute roles={['admin']}>
            <Utilisateurs />
          </ProtectedRoute>
        } />
        <Route path="/admin/groupes" element={
          <ProtectedRoute roles={['admin']}>
            <Groupes />
          </ProtectedRoute>
        } />
        <Route path="/admin/statistiques" element={
          <ProtectedRoute roles={['admin']}>
            <Statistiques />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;