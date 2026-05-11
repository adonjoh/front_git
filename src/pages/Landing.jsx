import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Users, Shield, Award, Zap, Star, Target, Trophy, ArrowRight } from 'lucide-react';

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#05050f] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0)_80%)]"></div>
      </div>

      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#05050f]/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
              CG
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Club Génie</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-300">
            <Link to="/vitrine" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-400 hover:after:w-full after:transition-all after:duration-300">Vitrine</Link>
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#gamification" className="hover:text-white transition-colors">Gamification</a>
          </nav>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors hidden md:block">
              Connexion
            </Link>
            <Link to="/register" className="px-6 py-2.5 rounded-full bg-white text-[#05050f] text-sm font-bold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Rejoindre
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pt-52 md:pb-32 px-6">
          <div className="container mx-auto text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-8 animate-fade-in-up shadow-[0_0_20px_rgba(99,102,241,0.1)]">
              <Star className="w-4 h-4 text-indigo-400" />
              <span>La nouvelle génération de la gestion associative</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Innovez, Créez et <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Inspirez le Futur
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
              Une plateforme ultra-moderne conçue pour sublimer l'expérience des membres, gérer des projets révolutionnaires et propulser votre club vers l'excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Rejoindre l'aventure
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/vitrine" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 backdrop-blur-md text-white text-lg font-bold border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center">
                Explorer les projets
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-24 container mx-auto px-4 md:px-12 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-3 md:p-6 shadow-2xl shadow-indigo-900/20 mx-auto max-w-6xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Plateforme Club Génie" 
                className="w-full h-auto rounded-xl md:rounded-2xl border border-white/10 opacity-90 transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 relative border-y border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Tout ce dont vous avez besoin</h2>
              <p className="text-xl text-slate-400 font-light">Une suite d'outils puissants pensée pour l'efficacité et l'esthétique.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-7 h-7 text-yellow-400" />, title: "Gestion Agile", desc: "Suivez l'avancement de vos projets techniques avec des outils modernes et collaboratifs." },
                { icon: <Users className="w-7 h-7 text-blue-400" />, title: "Membres & Rôles", desc: "Une architecture basée sur les permissions pour chaque membre du club (Censeurs, Chefs, Admin)." },
                { icon: <Trophy className="w-7 h-7 text-purple-400" />, title: "Gamification", desc: "Un système de points et de niveaux pour motiver et récompenser l'implication." },
                { icon: <Shield className="w-7 h-7 text-emerald-400" />, title: "Sécurité & QR", desc: "Contrôle des présences en un scan grâce à la génération de QR codes uniques." },
                { icon: <Calendar className="w-7 h-7 text-pink-400" />, title: "Événements", desc: "Ne manquez jamais une réunion importante ou un atelier de formation." },
                { icon: <Star className="w-7 h-7 text-indigo-400" />, title: "Forum Interne", desc: "Échangez, posez vos questions et partagez vos connaissances entre passionnés." }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                    {feature.icon}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gamification Section */}
        <section id="gamification" className="py-32 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Jouez le jeu, devenez une légende</h2>
              <p className="text-xl text-slate-400 font-light">Votre implication est récompensée. Cumulez des points, débloquez des badges et gravissez les échelons du club.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                  <Target className="w-8 h-8 text-indigo-400" />
                  Comment gagner des points ?
                </h3>
                {[
                  { action: "Présence aux réunions", points: "+10 pts", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-500/20" },
                  { action: "Tâche de projet complétée", points: "+50 pts", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-500/20" },
                  { action: "Aide sur le forum", points: "+20 pts", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-500/20" },
                  { action: "Absence non justifiée", points: "-30 pts", color: "text-red-400", bg: "bg-red-400/10 border-red-500/20" },
                ].map((rule, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <span className="font-semibold text-slate-300 text-lg">{rule.action}</span>
                    <span className={`font-bold px-4 py-2 rounded-xl border ${rule.color} ${rule.bg}`}>
                      {rule.points}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative mt-8 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl"></div>
                <div className="relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-xl">
                  <h3 className="text-2xl font-bold mb-10 text-center text-white">Les Rangs du Club</h3>
                  <div className="space-y-10 relative before:absolute before:inset-y-0 before:left-[23px] before:w-[2px] before:bg-white/10">
                    {[
                      { rank: "Novice", pts: "0 - 100 pts", icon: <Star className="w-6 h-6 text-slate-400" /> },
                      { rank: "Initié", pts: "100 - 500 pts", icon: <Zap className="w-6 h-6 text-blue-400" /> },
                      { rank: "Expert", pts: "500 - 1000 pts", icon: <Award className="w-6 h-6 text-purple-400" /> },
                      { rank: "Légende", pts: "1000+ pts", icon: <Trophy className="w-6 h-6 text-yellow-400" /> },
                    ].map((level, i) => (
                      <div key={i} className="relative flex items-center gap-8 pl-14 group">
                        <div className="absolute left-0 w-12 h-12 rounded-2xl bg-[#05050f] border-2 border-white/10 flex items-center justify-center group-hover:border-indigo-500 group-hover:scale-110 transition-all z-10 shadow-lg">
                          {level.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{level.rank}</h4>
                          <p className="text-slate-400 font-medium">{level.pts}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">Prêt à dominer l'IT ?</h2>
            <p className="text-xl text-indigo-200/70 mb-12 max-w-2xl mx-auto font-light">
              Rejoignez une communauté de créateurs, développeurs et passionnés de technologie. Votre futur commence ici.
            </p>
            <Link to="/register" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#05050f] font-black text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Créer mon compte
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
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

export default Landing;
