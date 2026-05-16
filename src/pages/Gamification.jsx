import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Award, Zap, Star, Target, Trophy, Code, BookOpen, Crown, Settings } from 'lucide-react';

const Gamification = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#05050f] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

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
        {/* Hero Section */}
        <section className="text-center px-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-semibold mb-6 shadow-[0_0_20px_rgba(250,204,21,0.1)] animate-fade-in-up">
            <Trophy className="w-4 h-4" />
            <span>Système de Prime GIT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Jouez le jeu, devenez une <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">légende</span>
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            L'idée est d'attribuer des points de mérite convertibles en primes (reconnaissance, avantages, récompenses matérielles selon le budget du club). Votre implication est récompensée. Cumulez des points et gravissez les échelons du club.
          </p>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8">
                <Target className="w-8 h-8 text-indigo-400" />
                Comment gagner des points ?
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Category 1 */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10"><Users className="w-5 h-5"/></div> Présence & Engagement
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Présence réunion</span><span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">+5</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Ponctualité (mois complet)</span><span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">+10</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Participation atelier interne</span><span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">+15</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Recrutement membre actif</span><span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">+20</span></li>
                  </ul>
                </div>

                {/* Category 2 */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-lg font-bold text-blue-400 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10"><Code className="w-5 h-5"/></div> Contribution Technique
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Commit validé (projet club)</span><span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">+10</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Revue de code</span><span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">+10</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Documentation/Tutoriel</span><span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">+15</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Livraison mini-projet</span><span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">+30</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Création outil pour club</span><span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">+40</span></li>
                  </ul>
                </div>

                {/* Category 3 */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-lg font-bold text-purple-400 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10"><Trophy className="w-5 h-5"/></div> Compétition & Représ.
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Présentation club</span><span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">+20</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Hackathon au nom du GIT</span><span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">+25</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Top 3 local</span><span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">+50</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Top 3 nat/inter</span><span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">+100</span></li>
                  </ul>
                </div>

                {/* Category 4 */}
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <h4 className="text-lg font-bold text-pink-400 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-pink-500/10"><BookOpen className="w-5 h-5"/></div> Partage de Savoir
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Publication article/tuto</span><span className="font-bold text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md">+20</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Animation atelier interne</span><span className="font-bold text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md">+25</span></li>
                    <li className="flex justify-between items-center text-sm"><span className="text-slate-300">Mentoring (1 mois)</span><span className="font-bold text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md">+30</span></li>
                  </ul>
                </div>
                
                {/* Category 5 */}
                <div className="sm:col-span-2 p-6 rounded-3xl bg-gradient-to-r from-white/[0.02] to-yellow-500/[0.02] border border-white/5 hover:border-yellow-500/20 transition-colors">
                  <h4 className="text-lg font-bold text-yellow-400 mb-6 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-yellow-500/10"><Star className="w-5 h-5"/></div> Primes Spéciales (Bureau)
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#05050f]/50 border border-white/5">
                      <span className="text-slate-300 text-sm">Initiative remarquable</span>
                      <span className="font-bold text-yellow-400">+20 à 60 pts</span>
                    </div>
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#05050f]/50 border border-white/5">
                      <span className="text-slate-300 text-sm">Gestion événement club</span>
                      <span className="font-bold text-yellow-400">+40 pts</span>
                    </div>
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#05050f]/50 border border-white/5">
                      <span className="text-slate-300 text-sm">Partenariat obtenu</span>
                      <span className="font-bold text-yellow-400">+50 pts</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 mt-8 lg:mt-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-[2.5rem] blur-2xl"></div>
                <div className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-xl">
                  <h3 className="text-2xl font-bold mb-8 text-center text-white">Barème de Récompenses</h3>
                  <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[23px] before:w-[2px] before:bg-white/10">
                    {[
                      { rank: "Bronze", pts: "50 pts", reward: "Certificat de reconnaissance", icon: <Star className="w-6 h-6 text-orange-400" />, shadow: "shadow-orange-500/20" },
                      { rank: "Argent", pts: "150 pts", reward: "Accès prioritaire aux formations", icon: <Shield className="w-6 h-6 text-slate-300" />, shadow: "shadow-slate-400/20" },
                      { rank: "Or", pts: "300 pts", reward: "Mise en avant officielle + cadeau symbolique", icon: <Award className="w-6 h-6 text-yellow-400" />, shadow: "shadow-yellow-500/20" },
                      { rank: "Élite", pts: "500 pts", reward: "Prime financière ou matérielle", icon: <Crown className="w-6 h-6 text-indigo-400" />, shadow: "shadow-indigo-500/20" },
                    ].map((level, i) => (
                      <div key={i} className="relative flex items-center gap-6 pl-14 group">
                        <div className={`absolute left-0 w-12 h-12 rounded-2xl bg-[#05050f] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all z-10 shadow-lg ${level.shadow}`}>
                          {level.icon}
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 p-4 rounded-2xl group-hover:bg-white/[0.05] transition-colors">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{level.rank}</h4>
                            <span className="text-xs font-black text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full">{level.pts}</span>
                          </div>
                          <p className="text-slate-400 font-medium text-sm">{level.reward}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Settings className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                  <Settings className="w-6 h-6 text-slate-400" />
                  Règles de fonctionnement
                </h3>
                <ul className="space-y-4 text-slate-300 text-sm font-light relative z-10">
                  <li className="flex gap-3"><span className="text-yellow-400 font-bold">•</span> <span><strong className="text-white">Période :</strong> Les points se cumulent par semestre ou par année académique.</span></li>
                  <li className="flex gap-3"><span className="text-yellow-400 font-bold">•</span> <span><strong className="text-white">Validation :</strong> Chaque prime est validée par un responsable (président ou secrétaire général).</span></li>
                  <li className="flex gap-3"><span className="text-yellow-400 font-bold">•</span> <span><strong className="text-white">Transparence :</strong> Un tableau de bord visible par tous les membres (Google Sheets, Discord bot, etc.).</span></li>
                  <li className="flex gap-3"><span className="text-yellow-400 font-bold">•</span> <span><strong className="text-white">Plafond :</strong> Éviter la domination d'un seul type (ex. max 100 pts/mois par catégorie).</span></li>
                  <li className="flex gap-3"><span className="text-yellow-400 font-bold">•</span> <span><strong className="text-white">Litiges :</strong> Un comité de 3 personnes tranche en cas de contestation.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-[#05050f] pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 text-center md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white shadow-lg">
              CG
            </div>
            <span className="text-xl font-bold tracking-tight">Club Génie</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Club Génie. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Gamification;
