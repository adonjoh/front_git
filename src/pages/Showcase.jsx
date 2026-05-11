import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Code, Layout, Cpu, Zap, ArrowLeft, ExternalLink, Loader2, Award, Star } from 'lucide-react';
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
    if (index === 0 || r.includes('légende')) return <Trophy className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />;
    if (r.includes('expert')) return <Award className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />;
    return <Zap className="w-5 h-5 text-blue-400" />;
  };

  const getProjectIcon = (type) => {
    const t = type?.toLowerCase() || '';
    if (t.includes('web') || t.includes('app')) return <Code className="w-6 h-6 text-indigo-400" />;
    if (t.includes('robot') || t.includes('hard')) return <Cpu className="w-6 h-6 text-emerald-400" />;
    return <Layout className="w-6 h-6 text-purple-400" />;
  };

  return (
    <div className="min-h-[100dvh] bg-[#05050f] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#05050f]/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl text-white shadow-lg group-hover:scale-105 transition-transform">
              CG
            </div>
            <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">Club Génie</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-white text-slate-300 font-semibold transition-colors flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" /> <span className="hidden sm:inline">Retour Accueil</span>
            </Link>
          </nav>
          <div className="flex items-center">
            <Link to="/register" className="px-6 py-2.5 rounded-full bg-white text-[#05050f] text-sm font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Rejoindre
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Showcase */}
        <section className="text-center px-6 mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up">
            La Vitrine des <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Talents</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Découvrez l'excellence de notre communauté à travers leurs projets et leur implication.
          </p>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-6" />
            <p className="text-slate-400 font-medium text-lg">Génération de la vitrine...</p>
          </div>
        ) : (
          <>
            {/* Leaderboard */}
            <section className="container mx-auto px-6 md:px-12 mb-32">
              <div className="mb-12">
                <h2 className="text-4xl font-bold flex items-center gap-4 mb-4">
                  <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                  Hall of Fame
                </h2>
                <p className="text-xl text-slate-400 font-light">Les légendes qui façonnent notre club au quotidien.</p>
              </div>

              {topMembers.length === 0 ? (
                <div className="text-center p-16 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <p className="text-slate-400 text-lg">Le tableau est encore vierge. Soyez le premier à l'inscrire !</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topMembers.map((member, i) => (
                    <div key={member.id || i} className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all hover:-translate-y-2 overflow-hidden backdrop-blur-md">
                      {i === 0 && <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>}
                      
                      <div className="absolute top-5 right-5 flex flex-col items-center">
                        {getRankIcon(i, member.rank_name)}
                        <span className="text-xs font-black mt-1 text-slate-500">#{i + 1}</span>
                      </div>
                      
                      <div className="flex flex-col items-center text-center mt-4">
                        <div className="w-24 h-24 rounded-full bg-slate-900 p-1.5 mb-6 relative shadow-xl">
                          {i === 0 && <div className="absolute -inset-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-md opacity-40 animate-pulse"></div>}
                          <img src={member.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.prenom || member.nom || i}`} alt={member.nom} className="w-full h-full rounded-full object-cover relative z-10 border-2 border-[#05050f]" />
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{member.prenom} {member.nom}</h3>
                        <p className="text-sm text-indigo-400 font-semibold mb-6 uppercase tracking-wider">{member.role_name || "Membre"}</p>
                        
                        <div className="w-full py-3 px-5 rounded-2xl bg-[#05050f]/50 border border-white/5 flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-400">{member.rank_name || "Actif"}</span>
                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">{member.total_points || 0} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Projects */}
            <section className="container mx-auto px-6 md:px-12">
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-4">Projets Innovants</h2>
                <p className="text-xl text-slate-400 font-light">Des concepts repoussant les limites de la technologie.</p>
              </div>

              {projects.length === 0 ? (
                <div className="text-center p-16 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                  <p className="text-slate-400 text-lg">Les projets de demain se préparent aujourd'hui.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, i) => (
                    <div key={project.id || i} className="group rounded-[2rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all hover:-translate-y-2 backdrop-blur-sm flex flex-col">
                      <div className="h-56 overflow-hidden relative">
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10"></div>
                        <img 
                          src={project.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"} 
                          alt={project.titre || project.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 right-4 z-20">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ${
                            (project.statut || project.status) === 'Terminé' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            {project.statut || project.status || 'En cours'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 flex-1 flex flex-col relative">
                        <div className="absolute -top-8 left-8 w-16 h-16 rounded-2xl bg-[#05050f] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-indigo-500/50 transition-all z-20">
                          {getProjectIcon(project.type || project.category)}
                        </div>
                        
                        <h3 className="text-2xl font-bold mt-8 mb-4 group-hover:text-indigo-400 transition-colors">{project.titre || project.title}</h3>
                        <p className="text-slate-400 text-sm mb-8 flex-1 line-clamp-3 leading-relaxed font-light">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {Array.isArray(project.technologies) 
                            ? project.technologies.map((tech, j) => (
                                <span key={j} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
                                  {tech}
                                </span>
                              ))
                            : (typeof project.technologies === 'string' ? project.technologies.split(',').map((tech, j) => (
                                <span key={j} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
                                  {tech.trim()}
                                </span>
                              )) : null)
                          }
                        </div>
                        
                        <Link to="/register" className="inline-flex items-center gap-2 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 transition-colors group/link">
                          Soutenir ce projet <ExternalLink className="w-4 h-4 text-purple-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="relative z-10 bg-[#05050f] pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white shadow-lg">
                CG
              </div>
              <span className="text-2xl font-bold tracking-tight">Club Génie</span>
            </div>
            <div className="flex gap-8 text-sm font-semibold text-slate-400">
              <a href="#" className="hover:text-white transition-colors">À propos</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center md:flex md:justify-between md:items-center">
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} Club Génie. Tous droits réservés.
            </p>
            <p className="text-slate-600 text-sm font-medium mt-4 md:mt-0 flex items-center justify-center gap-1">
              Designé avec <span className="text-pink-500">♥</span> pour l'excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Showcase;
