import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS devices
    const isIosDevice = /ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase()) && !window.MSStream;
    const isStandalone = ('standalone' in window.navigator) && window.navigator.standalone;
    
    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      // Show prompt after a small delay to let user see the app first
      setTimeout(() => setShowPrompt(true), 3000);
    }

    const handler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-96 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-100 p-4 z-[100] animate-fade-in-up">
      <button 
        onClick={() => setShowPrompt(false)}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-1.5 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
          CG
        </div>
        <div className="flex-1 pr-6">
          <h3 className="font-bold text-slate-800">Installer Club Génie</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {isIOS 
              ? "Pour installer l'appli, appuyez sur Partager puis sur 'Sur l'écran d'accueil'."
              : "Ajoutez l'application à votre écran d'accueil pour une expérience optimale !"}
          </p>
        </div>
      </div>
      
      {!isIOS && (
        <button 
          onClick={handleInstall}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-indigo-500/20"
        >
          <Download className="w-4 h-4" />
          Installer maintenant
        </button>
      )}
      {isIOS && (
        <div className="mt-4 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-medium py-2.5 rounded-xl border border-slate-200">
          <Share className="w-4 h-4" />
          Utilisez le bouton Partager
        </div>
      )}
    </div>
  );
};

export default InstallPWA;
