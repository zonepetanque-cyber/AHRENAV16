import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShowInstallBanner(false);
  };

  if (!showInstallBanner) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 z-[100] bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-2xl flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="https://cdn.shopify.com/s/files/1/0915/3760/4942/files/Logo_application_2.jpg?v=1773420195" alt="AHRENA Logo" className="w-8 h-auto" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">AHRENA Club</h4>
            <p className="text-[10px] text-white/60">Installer l'application sur votre écran d'accueil</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleInstallClick}
            className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1"
          >
            <Download size={14} />
            Installer
          </button>
          <button 
            onClick={handleClose}
            className="p-2 text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPWA;
