import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Trophy, Code, Layout, Cpu, Star, Award, Zap, ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import api from '../lib/axios';

const Showcase = () => {
  const [scrolled, setScrolled] = useState(false);
  const [topMembers, setTopMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchVitrineData = async () => {
      try {
        setLoading(true);
        // Remplacer par vos routes API exactes si différentes
        const [membersRes, projectsRes] = await Promise.allSettled([
          api.get('/public/top-members'),
          api.get('/public/projects')
        ]);

        if (membersRes.status === 'fulfilled') {
          setTopMembers(membersRes.value.data.data || membersRes.value.data || []);
        }
        
        if (projectsRes.status === 'fulfilled') {
          setProjects(projectsRes.value.data.data || projectsRes.value.data || []);
        }
      } catch (error) {
        console.error("Erreur de récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVitrineData();
  }, []);

  const getRankIcon = (index, rankName) => {
    const r = rankName?.toLowerCase() || '';
    if (index === 0 || r.includes('légende')) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (r.includes('expert')) return <Award className="w-5 h-5 text-purple-400" />;
    return <Zap className="w-5 h-5 text-blue-400" />;
  };

  const getProjectIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('web') || t.includes('app')) return <Code className="w-6 h-6 text-indigo-400" />;
    if (t.includes('robot') || t.includes('hard')) return <Cpu className="w-6 h-6 text-emerald-400" />;
    return <Layout className="w-6 h-6 text-purple-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-slate-800/50 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              CG
            </div>
            <span className="text-xl font-bold tracking-tight">Club Génie</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Accueil
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/register" className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-semibold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Rejoindre
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-slate-800/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up">
            La Vitrine de nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Talents</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Découvrez les projets incroyables réalisés par notre communauté et célébrez nos membres les plus impliqués.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
          <p className="text-slate-400 font-medium">Chargement de la vitrine...</p>
        </div>
      ) : (
        <>
          {/* Leaderboard Section */}
          <section className="py-24 relative">
            <div className="container mx-auto px-6 md:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    Tableau d'Honneur
                  </h2>
                  <p className="text-slate-400">Les membres qui se surpassent et inspirent le club.</p>
                </div>
              </div>

              {topMembers.length === 0 ? (
                <div className="text-center p-12 rounded-2xl bg-slate-900/40 border border-slate-800">
                  <p className="text-slate-400">Aucun membre n'est affiché pour le moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topMembers.map((member, i) => (
                    <div key={member.id || i} className="relative group p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1 overflow-hidden">
                      {i === 0 && <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>}
                      <div className="absolute top-4 right-4 flex flex-col items-center">
                        {getRankIcon(i, member.rank_name)}
                        <span className="text-xs font-bold mt-1 text-slate-400">#{i + 1}</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center mt-4">
                        <div className="w-20 h-20 rounded-full bg-slate-800 p-1 mb-4 relative">
                          {i === 0 && <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur opacity-50"></div>}
                          <img src={member.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.prenom || member.nom || i}`} alt={member.nom} className="w-full h-full rounded-full object-cover relative z-10 bg-slate-900" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{member.prenom} {member.nom}</h3>
                        <p className="text-sm text-indigo-400 font-medium mb-4">{member.role_name || "Membre"}</p>
                        
                        <div className="w-full py-2 px-4 rounded-xl bg-slate-950/50 border border-slate-800/50 flex justify-between items-center">
                          <span className="text-sm text-slate-400">{member.rank_name || "Actif"}</span>
                          <span className="font-bold text-white">{member.total_points || 0} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-24 relative bg-slate-900/30 border-t border-slate-800/50">
            <div className="container mx-auto px-6 md:px-12">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-2">Projets Phares</h2>
                <p className="text-slate-400">Des idées transformées en réalité grâce à la collaboration.</p>
              </div>

              {projects.length === 0 ? (
                <div className="text-center p-12 rounded-2xl bg-slate-900 border border-slate-800">
                  <p className="text-slate-400">Les projets arrivent bientôt !</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, i) => (
                    <div key={project.id || i} className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors flex flex-col">
                      <div className="h-48 overflow-hidden relative bg-slate-800">
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img 
                          src={project.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"} 
                          alt={project.titre || project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 right-4 z-20">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${(project.statut || project.status) === 'Terminé' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                            {project.statut || project.status || 'En cours'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 -mt-12 relative z-20 shadow-xl group-hover:border-indigo-500/50 transition-colors">
                          {getProjectIcon(project.type || project.category)}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">{project.titre || project.title}</h3>
                        <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {Array.isArray(project.technologies) 
                            ? project.technologies.map((tech, j) => (
                                <span key={j} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 font-medium">
                                  {tech}
                                </span>
                              ))
                            : (typeof project.technologies === 'string' ? project.technologies.split(',').map((tech, j) => (
                                <span key={j} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-300 font-medium">
                                  {tech.trim()}
                                </span>
                              )) : null)
                          }
                        </div>
                        
                        <Link to="/register" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                          Rejoindre ce projet <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="container mx-auto px-6 md:px-12 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Club Génie. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default Showcase;
