import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const AuthComponent = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Vérifiez vos emails pour confirmer votre inscription !");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Redirection vers la PWA après OAuth — utilise l'URL exacte de l'app installée
      const redirectTo = window.location.origin + '/';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: false, // Laisser Supabase gérer la redirection
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        }
      });
      if (error) throw error;
      // La redirection est gérée par Supabase — pas besoin de window.location.href
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl">
      <h2 className="text-2xl font-black text-white uppercase italic mb-6 text-center">
        {isSignUp ? "Créer un compte" : "Connexion"}
      </h2>

      {isSignUp && (
        <div className="mb-6 p-3 bg-red-600/10 rounded-xl border border-red-600/20 text-center">
          <p className="text-[10px] text-red-600 font-black uppercase tracking-widest">
            Étape 1 : Créez votre compte gratuit
          </p>
        </div>
      )}

      <div className="mb-6">
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5 h-5" />
          Continuer avec Google
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
          <span className="bg-zinc-900 px-4 text-white/20">Ou avec email</span>
        </div>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-red-600 outline-none transition-colors"
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Mot de passe</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:border-red-600 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        {message && (
          <div className="flex items-center gap-2 text-emerald-500 text-xs bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
            <CheckCircle2 size={14} />
            {message}
          </div>
        )}

        <button 
          disabled={loading}
          className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-colors uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? "S'inscrire" : "Se connecter")}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-white/40 hover:text-white transition-colors text-xs font-medium"
        >
          {isSignUp ? "Déjà un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] mb-2">Une question ou un problème ?</p>
        <a href="mailto:support@ahrena.com" className="text-white/40 hover:text-white transition-colors text-[10px] font-medium">
          Contactez-nous à support@ahrena.com
        </a>
      </div>
    </div>
  );
};

export default AuthComponent;
