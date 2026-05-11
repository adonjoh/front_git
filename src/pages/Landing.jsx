import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Users, Shield, Award, Zap, Star, Target, Trophy } from 'lucide-react';

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
    <div className="min-h-[100dvh] bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-slate-800/50 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">
              CG
            </div>
            <span className="text-xl font-bold tracking-tight">Club Génie</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/vitrine" className="hover:text-white transition-colors">Vitrine</Link>
            <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Comment ça marche</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Témoignages</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden md:block">
              Connexion
            </Link>
            <Link to="/register" className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-semibold hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Rejoindre
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8 animate-fade-in-up">
            <Star className="w-4 h-4" />
            <span>La porte d'entrée vers de nouvelles opportunités</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Développez vos talents avec <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Passion et Excellence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Rejoignez une communauté dynamique ! Participez à des projets innovants, développez votre réseau et suivez votre progression en temps réel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Rejoindre le club
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800/50 text-white font-semibold border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center">
              Espace Membre
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-20 container mx-auto px-6 md:px-12 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative rounded-2xl md:rounded-[2.5rem] border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-2 md:p-4 shadow-2xl shadow-black/50 mx-auto max-w-5xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
              alt="Dashboard Preview" 
              className="w-full h-auto rounded-xl md:rounded-2xl border border-slate-800/50 opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi nous rejoindre ?</h2>
            <p className="text-slate-400">Découvrez une expérience associative unique, pensée pour valoriser votre talent et votre engagement.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Projets Ambitieux",
                desc: "Collaborez sur des projets concrets, développez vos compétences techniques et apprenez à travailler en équipe."
              },
              {
                icon: <Users className="w-6 h-6 text-blue-400" />,
                title: "Suivi Simplifié",
                desc: "Validez votre participation aux événements d'un simple scan de QR Code depuis votre smartphone."
              },
              {
                icon: <Award className="w-6 h-6 text-purple-400" />,
                title: "Évolution & Récompenses",
                desc: "Cumulez des points grâce à vos actions, gravissez les échelons et soyez récompensé pour votre implication."
              },
              {
                icon: <Shield className="w-6 h-6 text-emerald-400" />,
                title: "Cadre Professionnel",
                desc: "Évoluez dans un environnement sain et structuré, vous préparant aux exigences du monde professionnel."
              },
              {
                icon: <Calendar className="w-6 h-6 text-pink-400" />,
                title: "Événements Exclusifs",
                desc: "Accédez à notre calendrier d'ateliers, de formations et de rencontres pour ne rater aucune opportunité."
              },
              {
                icon: <Star className="w-6 h-6 text-indigo-400" />,
                title: "Réseau Solidaire",
                desc: "Échangez, posez vos questions et partagez vos idées avec les autres membres sur notre forum dédié."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60 hover:border-slate-700 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-24 relative bg-slate-900/30 border-y border-slate-800/50">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              <span>Système de points</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jouez le jeu, devenez une légende</h2>
            <p className="text-slate-400">Votre implication est récompensée. Cumulez des points, débloquez des badges et gravissez les échelons du club.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Rules */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-indigo-400" />
                Comment gagner des points ?
              </h3>
              {[
                { action: "Présence aux réunions", points: "+10 pts", color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { action: "Tâche de projet complétée", points: "+50 pts", color: "text-blue-400", bg: "bg-blue-400/10" },
                { action: "Aide sur le forum", points: "+20 pts", color: "text-purple-400", bg: "bg-purple-400/10" },
                { action: "Absence non justifiée", points: "-30 pts", color: "text-red-400", bg: "bg-red-400/10" },
              ].map((rule, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                  <span className="font-medium text-slate-300">{rule.action}</span>
                  <span className={`font-bold px-3 py-1 rounded-lg ${rule.color} ${rule.bg}`}>
                    {rule.points}
                  </span>
                </div>
              ))}
            </div>

            {/* Levels */}
            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-8 text-center text-slate-200">Les Rangs du Club</h3>
                <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-slate-800">
                  {[
                    { rank: "Novice", pts: "0 - 100 pts", icon: <Star className="w-5 h-5 text-slate-400" /> },
                    { rank: "Initié", pts: "100 - 500 pts", icon: <Zap className="w-5 h-5 text-blue-400" /> },
                    { rank: "Expert", pts: "500 - 1000 pts", icon: <Award className="w-5 h-5 text-purple-400" /> },
                    { rank: "Légende", pts: "1000+ pts", icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
                  ].map((level, i) => (
                    <div key={i} className="relative flex items-center gap-6 pl-12 group">
                      <div className="absolute left-0 w-10 h-10 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center group-hover:border-indigo-500 group-hover:scale-110 transition-all z-10">
                        {level.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{level.rank}</h4>
                        <p className="text-sm text-slate-500">{level.pts}</p>
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-950"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à vivre l'expérience ?</h2>
          <p className="text-xl text-indigo-200/70 mb-10 max-w-2xl mx-auto">
            Faites le premier pas, rejoignez une communauté passionnée et donnez vie à vos idées dès aujourd'hui.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-indigo-950 font-bold hover:bg-indigo-50 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            Créer mon compte
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/20">
                CG
              </div>
              <span className="text-xl font-bold tracking-tight">Club Génie</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">À propos</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Club Génie. Tous droits réservés.
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-1">
              Fait avec <span className="text-red-500">♥</span> pour les clubs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
