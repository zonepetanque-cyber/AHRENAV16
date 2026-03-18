import React, { useState, useEffect } from 'react';
import { Users, Lock, ChevronDown, CheckCircle2, Mail, LogOut, Settings, ShieldAlert, Bell, BellOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthComponent from './AuthComponent';
import { 
  subscribeToPush, unsubscribeFromPush, isPushEnabled,
  toggleChannelSubscription, getChannelSubscriptions
} from '../services/notificationService';

const FAQ_ITEMS = [
  // ... same items
];

const ClubComponent = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [channelSubs, setChannelSubs] = useState<string[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);

  // Admin : vérifié via l'email du compte connecté
  const isAdmin = user?.email === 'romaricandco@gmail.com';

  useEffect(() => {
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setLoading(false);
        }
      }).catch(err => {
        console.error("Supabase session error:", err);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setIsPremium(false);
        }
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Supabase not initialized:", error);
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', userId)
      .single();
    
    if (data) {
      setIsPremium(data.is_premium);
      if (data.is_premium) {
        // Charger état push et abonnements chaînes
        const [pushState, subs] = await Promise.all([
          isPushEnabled(),
          getChannelSubscriptions(),
        ]);
        setPushEnabled(pushState);
        setChannelSubs(subs);
      }
    }
    setLoading(false);
  };

  const handleTogglePush = async () => {
    if (!isPremium) return;
    setNotifLoading(true);
    if (pushEnabled) {
      await unsubscribeFromPush();
      setPushEnabled(false);
    } else {
      const ok = await subscribeToPush();
      setPushEnabled(ok);
    }
    setNotifLoading(false);
  };

  const handleToggleChannel = async (channel: string) => {
    if (!isPremium) return;
    const isSubbed = channelSubs.includes(channel);
    await toggleChannelSubscription(channel, !isSubbed);
    setChannelSubs(prev =>
      isSubbed ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err: any) {
      alert("Erreur lors de la création de la session de paiement : " + err.message);
    }
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="pt-24 pb-12 px-6 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-white uppercase italic mb-2">Rejoindre le Club</h1>
          <p className="text-white/40 text-sm">Accédez à l'expérience ultime AHRENA pour seulement 2€/mois.</p>
        </div>

        {/* Benefits Preview for non-logged users */}
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 mb-12">
          <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-6 text-center">Avantages Membre VIP</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: "Multiplex", desc: "Regardez 2 flux en simultané" },
              { title: "Chat Premium", desc: "Échangez en direct avec d'autres passionnés" },
              { title: "ACCÈS AUX NOTIFICATIONS", desc: "Choisissez vos notifications personnalisées" }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="mt-1">
                  <CheckCircle2 size={16} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase italic">{benefit.title}</p>
                  <p className="text-xs text-white/40">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="text-2xl font-black text-white italic">2,00€ <span className="text-xs font-normal text-white/40 uppercase tracking-widest not-italic">/ mois</span></div>
            <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 mb-6">Sans engagement • Annulation en 1 clic</p>
            <div className="p-4 bg-red-600/10 rounded-xl border border-red-600/20">
              <p className="text-xs text-white font-medium">👉 Pour devenir membre, créez votre compte ci-dessous puis activez l'offre VIP.</p>
            </div>
          </div>
        </div>

        <AuthComponent />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-white border border-white/10">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase italic">{user.email?.split('@')[0]}</h1>
            <p className={`text-[10px] uppercase tracking-widest font-bold ${isPremium ? 'text-red-600' : 'text-white/40'}`}>
              {isPremium ? 'Membre VIP' : 'Membre Standard'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <button 
              onClick={() => onTabChange('admin')}
              className="p-2 bg-red-600/10 rounded-lg text-red-600 hover:bg-red-600/20 transition-colors"
              title="Administration"
            >
              <ShieldAlert size={20} />
            </button>
          )}
          <button className="p-2 bg-zinc-900 rounded-lg text-white/60 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <button onClick={handleLogout} className="p-2 bg-zinc-900 rounded-lg text-red-500/60 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* VIP Card */}
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 border border-white/10 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">OFFRE VIP</div>
        </div>
        
        <div className="mb-8">
          <div className="text-3xl font-black text-white mb-1">2,00€ <span className="text-sm font-normal text-white/40">/ mois</span></div>
          <p className="text-white/40 text-xs">Sans engagement, annulation facile.</p>
        </div>

        <ul className="space-y-4 mb-8">
          {[
            "Chat VIP en direct avec d'autres passionnés",
            "Mode Multiplex (2 flux simultanés)",
            "ACCÈS AUX NOTIFICATIONS : choisissez vos notifications",
            "Accès prioritaire aux nouveaux événements"
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-white/80">
              <CheckCircle2 size={18} className="text-red-600 flex-none" />
              {feature}
            </li>
          ))}
        </ul>

        <button 
          onClick={handleCheckout}
          className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-colors uppercase tracking-widest shadow-xl"
        >
          Devenir Membre VIP
        </button>
      </div>

      {/* Notifications Settings */}
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5 mb-12">
        <h2 className="text-sm font-black text-white uppercase italic mb-6 flex items-center gap-2">
          <Settings size={18} className="text-red-600" />
          Notifications Push
        </h2>
        
        <div className="space-y-6">

          {/* Switch global push — VIP uniquement */}
          <div className={`flex items-center justify-between ${!isPremium ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-2">
              {pushEnabled ? <Bell size={16} className="text-red-500" /> : <BellOff size={16} className="text-white/30" />}
              <div>
                <p className="text-sm font-bold text-white">Notifications Push</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Lives & nouvelles vidéos</p>
              </div>
            </div>
            <button
              onClick={handleTogglePush}
              disabled={notifLoading}
              className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${pushEnabled ? 'bg-red-600' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${pushEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          {!isPremium && (
            <div className="p-3 bg-red-600/10 rounded-lg border border-red-600/20 text-center">
              <p className="text-[9px] text-red-600 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                <Lock size={10} /> Notifications réservées aux membres VIP
              </p>
            </div>
          )}

          {/* Switches par chaîne — VIP uniquement */}
          <div className={`space-y-4 pt-4 border-t border-white/5 ${!isPremium ? 'opacity-30 grayscale pointer-events-none' : ''}`}>
            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-4">Notifications par chaîne</p>
            {[
              "Boulistenaute",
              "Sportmag",
              "Sportmediamat",
              "Pétanque Academy",
              "Groupe Pétanque",
              "Pétanque TV Europe",
              "PPF",
              "FFPJP",
              "FFSB"
            ].map((channel) => {
              const isSubbed = channelSubs.includes(channel);
              return (
                <div key={channel} className="flex items-center justify-between">
                  <span className="text-xs text-white/80">{channel}</span>
                  <button
                    onClick={() => handleToggleChannel(channel)}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${isSubbed ? 'bg-red-600' : 'bg-zinc-800'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow transition-all duration-200 ${isSubbed ? 'right-1' : 'left-1'} ${!isSubbed ? 'opacity-30' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-xl font-black text-white uppercase italic mb-6 flex items-center gap-2">
          Questions Fréquentes
        </h2>
        <div className="space-y-3">
          {[
            {
              question: "Comment annuler mon abonnement ?",
              answer: "À tout moment, en un clic depuis votre Profil."
            },
            {
              question: "Les vidéos sont-elles payantes ?",
              answer: "Non, le visionnage est 100% gratuit. L'abonnement débloque le chat premium, le multiplex et la gestion personnalisée des notifications."
            },
            {
              question: "Sur quels appareils ça fonctionne ?",
              answer: "Sur votre mobile, tablette et ordinateur."
            },
            {
              question: "Puis-je proposer ma chaîne pour qu'elle apparaisse sur AHRENA ?",
              answer: "OUI, envoyez-nous le lien de votre chaîne par mail. Si elle correspond à une chaîne de sport amateur, nous vous contacterons."
            }
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-bold text-white/90">{item.question}</span>
                <ChevronDown size={18} className={`text-white/40 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-white/50 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Contact */}
      <div className="text-center py-8 border-t border-white/5">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] mb-4">Une question ou un problème ?</p>
        <a href="mailto:support@ahrena.com" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-medium">
          <Mail size={14} />
          support@ahrena.com
        </a>
        <div className="mt-6 pt-4 border-t border-white/5">
          <button
            onClick={() => onTabChange('legal')}
            className="text-white/20 hover:text-white/50 transition-colors text-[10px] uppercase tracking-widest"
          >
            Mentions légales & RGPD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubComponent;
